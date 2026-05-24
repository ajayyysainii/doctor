import { RtcRole, RtcTokenBuilder } from "agora-token";

const TOKEN_TTL_SEC = 60 * 60 * 24; // 24h

export function buildRtcTokenForUid(params: {
  channelName: string;
  uid: number;
}): { token: string; appId: string } {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  if (!appId || !appCertificate) {
    throw new Error("AGORA_APP_ID and AGORA_APP_CERTIFICATE must be set");
  }
  const role = RtcRole.PUBLISHER;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    params.channelName,
    params.uid,
    role,
    TOKEN_TTL_SEC,
    TOKEN_TTL_SEC,
  );
  return { token, appId };
}
