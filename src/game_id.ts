declare const _: unique symbol;
export type GameId = string & { readonly [_]: unique symbol };
