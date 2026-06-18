export const STAMP_DRAG_THRESHOLD_PX = 8;

export interface StampInteractionState {
  movementDistance: number;
  isControlTarget?: boolean;
  isNoStampTarget?: boolean;
  dragWasActive?: boolean;
}

export function shouldStampFromPointerInteraction({
  movementDistance,
  isControlTarget = false,
  isNoStampTarget = false,
  dragWasActive = false,
}: StampInteractionState): boolean {
  return (
    movementDistance <= STAMP_DRAG_THRESHOLD_PX &&
    !isControlTarget &&
    !isNoStampTarget &&
    !dragWasActive
  );
}

export function isStampBlockedElement(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.closest('[data-no-stamp="true"]')) {
    return true;
  }

  return Boolean(target.closest('button,input,select,textarea,a'));
}
