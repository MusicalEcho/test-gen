import { textToPatch, patchToText } from './textDiffHelpers';


describe('textDiffHelpers:', () => {
  const text: string = 'Awesome text';

  const testingData: Record<string, string>[] = [
    {
      test: 'when added some characters',
      newText: 'Awesome text (not at all)',
      patch: '@@ -5,8 +5,21 @@\n ome text\n+ (not at all)\n',
    },
    {
      test: 'when removed characters',
      newText: 'text',
      patch: '@@ -1,12 +1,4 @@\n-Awesome \n text\n',
    },
    {
      test: 'when text changed',
      newText: 'Here could be your Lorem Ipsum',
      patch: '@@ -1,12 +1,30 @@\n-Aw\n+H\n e\n-s\n+re c\n o\n-m\n+uld b\n e \n-t\n+your Lor\n e\n-xt\n+m Ipsum\n',
    },
  ];

  describe('get patch:', () => {
    testingData.forEach(({ test, newText, patch }) => {
      it(test, () => {
        expect(textToPatch(text, newText)).toEqual(patch);
      });
    });
  });

  describe('apply patch:', () => {
    testingData.forEach(({ test, newText, patch }) => {
      it(test, () => {
        expect(patchToText(patch, text)).toEqual(newText);
      });
    });
  });
});
