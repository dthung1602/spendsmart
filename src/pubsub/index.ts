import { Transaction } from "../database";

type PublishParams =
  | ["transaction-added", Transaction]
  | ["transaction-deleted", Transaction];

type Handler = ((data: PublishParams[1]) => void) | null;

type SubscribeParams = [PublishParams[0], Handler];

const mapping = new Map<SubscribeParams[0], Handler[]>();

// TODO fix this
export const publish: (...args: PublishParams) => void = (topic, data) => {
  mapping.get(topic)?.forEach((handler) => {
    if (handler) handler(data);
  });
};

export const subscribe: (...args: SubscribeParams) => () => void = (
  topic,
  handler
) => {
  if (!mapping.has(topic)) {
    mapping.set(topic, []);
  }
  mapping.get(topic)?.push(handler);
  return () => {
    const handlers = mapping.get(topic) as Handler[];
    const idx = handlers.indexOf(handler);
    if (idx > -1) {
      handlers.splice(idx, 1);
    }
  };
};
