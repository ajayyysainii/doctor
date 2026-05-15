"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AgoraRTC, {
  AgoraRTCProvider,
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
  useRTCClient,
} from "agora-rtc-react";

function VideoInner({ bookingId, role }: { bookingId: string; role: "admin" | "user" }) {
  const router = useRouter();
  const client = useRTCClient();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const { isLoading: joining, isConnected, error: joinError } = useJoin(
    async () => {
      const r = await fetch(
        `/api/agora/token?bookingId=${encodeURIComponent(bookingId)}&role=${role}`,
        { credentials: "include" },
      );
      const j = (await r.json()) as {
        error?: string;
        appid?: string;
        channel?: string;
        token?: string;
        uid?: number;
      };
      if (!r.ok) {
        throw new Error(j.error ?? "token_failed");
      }
      return {
        appid: j.appid!,
        channel: j.channel!,
        token: j.token!,
        uid: j.uid!,
      };
    },
    true,
    client,
  );

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
  const { localCameraTrack } = useLocalCameraTrack(true);

  usePublish([localMicrophoneTrack, localCameraTrack], isConnected, client);

  const remoteUsers = useRemoteUsers(client);
  const selfUid = client.uid;

  const leave = async () => {
    try {
      await client.leave();
    } catch {
      /* ignore */
    }
    router.push(role === "admin" ? "/admin/dashboard" : "/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <header className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
        <h1 className="text-sm font-semibold">
          Consultation {role === "admin" ? "(Doctor)" : ""} — {bookingId.slice(0, 8)}…
        </h1>
        <button
          type="button"
          onClick={() => void leave()}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold hover:bg-red-500"
        >
          Leave
        </button>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xs text-gray-400">You</p>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
            {joining ? (
              <div className="flex h-full items-center justify-center text-sm">Connecting…</div>
            ) : joinError ? (
              <div className="flex h-full items-center justify-center p-4 text-center text-sm text-red-400">
                {joinError instanceof Error ? joinError.message : String(joinError)}
              </div>
            ) : (
              <LocalUser
                audioTrack={localMicrophoneTrack}
                videoTrack={localCameraTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                playAudio={false}
                playVideo
                className="h-full w-full"
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMicOn((v) => !v)}
              className="rounded-lg bg-gray-800 px-3 py-2 text-sm"
            >
              {micOn ? "Mute mic" : "Unmute mic"}
            </button>
            <button
              type="button"
              onClick={() => setCameraOn((v) => !v)}
              className="rounded-lg bg-gray-800 px-3 py-2 text-sm"
            >
              {cameraOn ? "Camera off" : "Camera on"}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xs text-gray-400">{role === "admin" ? "Patient" : "Doctor"}</p>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
            {!isConnected ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Waiting for the other participant…
              </div>
            ) : (
              (() => {
                const others = remoteUsers.filter((u) => u.uid !== selfUid);
                if (others.length === 0) {
                  return (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                      Connected — waiting for the other participant…
                    </div>
                  );
                }
                return others.map((user) => (
                  <RemoteUser
                    key={user.uid}
                    user={user}
                    playVideo
                    playAudio
                    className="h-full w-full"
                  />
                ));
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConsultationClient({
  bookingId,
  role,
}: {
  bookingId: string;
  role: "admin" | "user";
}) {
  const client = useMemo(
    () => AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
    [],
  );

  return (
    <AgoraRTCProvider client={client}>
      <VideoInner bookingId={bookingId} role={role} />
    </AgoraRTCProvider>
  );
}
