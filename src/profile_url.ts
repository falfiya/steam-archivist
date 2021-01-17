declare const _: unique symbol;

const starts_with_steam = (url: string) => false
   || url.startsWith("https://steamcommunity.com/id/")
   || url.startsWith("https://steamcommunity.com/profiles/")

const is_profile_url = (url: string) => true
   && starts_with_steam(url)
   && !url.endsWith('/');

export type ProfileURL = string & { readonly [_]: unique symbol };

export const make = (url: string): ProfileURL | null =>
   is_profile_url(url)
   ? url as ProfileURL
   : null
