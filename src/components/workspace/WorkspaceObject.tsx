"use client";

import { ROOM_H, ROOM_W, artSrc, type PanelId, type SceneObject } from "@/lib/workspace/scene";

/**
 * One object in the room.
 *
 * Positioned as a percentage of the room, so it holds its place at any size.
 * If it opens something it is a real button, with a real label, reachable by
 * keyboard and announced by a screen reader. If it does not, it is decoration
 * and is hidden from assistive technology entirely.
 */
export default function WorkspaceObject({
  object: o,
  dark,
  interactive,
  onOpen,
  children,
}: {
  object: SceneObject;
  dark: boolean;
  interactive: boolean;
  onOpen: (panel: PanelId) => void;
  children?: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    left: `${(o.x / ROOM_W) * 100}%`,
    top: `${(o.y / ROOM_H) * 100}%`,
    width: `${(o.w / ROOM_W) * 100}%`,
    ...(o.h ? { height: `${(o.h / ROOM_H) * 100}%` } : {}),
    zIndex: o.z,
  };

  const inner = children ?? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={artSrc(o.art ?? "papers", dark)}
      alt=""
      className="ws-art"
      loading="lazy"
      decoding="async"
    />
  );

  if (!o.panel || !interactive) {
    return (
      <div className="ws-object" style={style} aria-hidden={!o.panel}>
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="ws-object ws-hit"
      style={style}
      onClick={() => onOpen(o.panel!)}
      aria-label={o.hint ? `${o.label}. ${o.hint}` : o.label}
      data-object={o.id}
    >
      {inner}
      <span className="ws-tip" aria-hidden="true">
        <b>{o.label}</b>
        {o.hint && <i>{o.hint}</i>}
      </span>
    </button>
  );
}
