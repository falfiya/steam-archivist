declare const _: unique symbol;
export type GameId = number & { readonly [_]: unique symbol };
