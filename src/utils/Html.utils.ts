import { Parser } from 'htmlparser2';
import { isNothing } from './Common.utils';

export function removeTagsAndEntities(
  html: string | undefined,
): string | undefined {
  if (isNothing(html)) {
    return;
  }
  let text = '';
  const parser = new Parser(
    {
      ontext(data) {
        text += data;
      },
    },
    { decodeEntities: true },
  );
  parser.write(html!);
  parser.end();
  return text;
}
