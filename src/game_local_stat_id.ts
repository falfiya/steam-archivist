declare const _: unique symbol;
export type GameLocalStatId = string & { readonly [_]: unique symbol };
