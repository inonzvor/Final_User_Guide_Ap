/**
 * Renders a translated string that may contain inline markup (e.g. `<a>`,
 * `<strong>`) coming from the bundled i18n JSON in ../../../src/model/i18n.
 * Safe only because that content is static and reviewed like any other
 * source file — never wire this up to user-supplied or remotely-fetched
 * text without sanitizing it first.
 */
export function Html({ value }: { value: string }) {
  return <span dangerouslySetInnerHTML={{ __html: value }} />;
}
