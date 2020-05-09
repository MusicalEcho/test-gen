import DiffMatchPatch from 'diff-match-patch';

const dmp = new DiffMatchPatch();

export function textToPatch(oldText: string, newText: string): string {
  const diff = dmp.diff_main(oldText, newText);
  const patch = dmp.patch_make(oldText, newText, diff);
  return dmp.patch_toText(patch);
}

export function patchToText(textPatch: string, text: string): string {
  const patch = dmp.patch_fromText(textPatch);

  try {
    const result = dmp.patch_apply(patch, text);
    return result[0];
  } catch (e) {
    console.error(`Patch error: ${e}`);
    return text;
  }
}
