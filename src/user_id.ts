declare const _: unique symbol;
export type UserId = number & { readonly [_]: unique symbol };
