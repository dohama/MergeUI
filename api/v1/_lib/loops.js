// Loops API 헬퍼 — 연락처 동기화 + 이벤트 트리거
// Docs: https://loops.so/docs/api-reference
const LOOPS_API_URL = 'https://app.loops.so/api/v1';

function getApiKey() {
  var key = process.env.LOOPS_API_KEY;
  if (!key) {
    console.warn('[Loops] LOOPS_API_KEY not set — email operations will be skipped');
    return null;
  }
  return key;
}

async function loopsFetch(endpoint, options) {
  var key = getApiKey();
  if (!key) return { skipped: true };

  var res = await fetch(LOOPS_API_URL + endpoint, {
    method: options?.method || 'POST',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    body: options?.body ? JSON.stringify(options.body) : undefined
  });

  var text = await res.text();
  var data;
  try { data = text ? JSON.parse(text) : {}; } catch (e) { data = { raw: text }; }

  if (!res.ok) {
    console.error('[Loops]', endpoint, 'error:', res.status, data);
    return { ok: false, status: res.status, error: data };
  }
  return { ok: true, data: data };
}

// 연락처 생성 또는 업데이트 (upsert)
// fields: email (required), firstName, lastName, userGroup, userId, subscribed 등
async function upsertContact(fields) {
  if (!fields || !fields.email) throw new Error('email is required');
  return loopsFetch('/contacts/update', {
    method: 'PUT',
    body: fields
  });
}

// 연락처 신규 생성 (중복 이메일은 에러)
async function createContact(fields) {
  if (!fields || !fields.email) throw new Error('email is required');
  return loopsFetch('/contacts/create', {
    method: 'POST',
    body: fields
  });
}

// 연락처 삭제 (GDPR 요청 시)
async function deleteContact(email) {
  return loopsFetch('/contacts/delete', {
    method: 'POST',
    body: { email: email }
  });
}

// 커스텀 이벤트 전송 — Loops 루프 트리거
// eventName: 'signup', 'theme_downloaded', 'subscription_cancelled' 등
// eventProperties: 템플릿에서 사용할 변수
async function sendEvent(email, eventName, eventProperties) {
  if (!email || !eventName) throw new Error('email and eventName are required');
  return loopsFetch('/events/send', {
    method: 'POST',
    body: {
      email: email,
      eventName: eventName,
      eventProperties: eventProperties || {}
    }
  });
}

// 트랜잭셔널 이메일 (템플릿 ID 기반 단건 발송)
async function sendTransactional(transactionalId, email, dataVariables) {
  return loopsFetch('/transactional', {
    method: 'POST',
    body: {
      transactionalId: transactionalId,
      email: email,
      dataVariables: dataVariables || {}
    }
  });
}

module.exports = {
  upsertContact: upsertContact,
  createContact: createContact,
  deleteContact: deleteContact,
  sendEvent: sendEvent,
  sendTransactional: sendTransactional
};
