import {textToPatch, patchToText} from './textDiffHelpers';


describe('textDiffHelpers:', () => {
    const text: string = 'Awesome text';

    const testingData: Record<string, string>[] = [
        {
            newText: 'Awesome text (not at all)',
            patch: '@@ -5,8 +5,21 @@\n ome text\n+ (not at all)\n'
        },
        {
            newText: 'text',
            patch: '@@ -1,12 +1,4 @@\n-Awesome \n text\n'
        },
        {
            newText: 'Here could be your Lorem Ipsum',
            patch: '@@ -1,12 +1,30 @@\n-Aw\n+H\n e\n-s\n+re c\n o\n-m\n+uld b\n e \n-t\n+your Lor\n e\n-xt\n+m Ipsum\n',
        },
    ];

    let i = 0;

    afterEach(() => i++);

    describe('get patch:', () => {
        beforeAll(() => i = 0);

        it('when added some characters', () => {
            const {newText, patch} = testingData[i];
            expect(textToPatch(text, newText)).toEqual(patch);
        });

        it('when removed characters', () => {
            const {newText, patch} = testingData[i];
            expect(textToPatch(text, newText)).toEqual(patch);
        });

        it('when text changed', () => {
            const {newText, patch} = testingData[i];
            expect(textToPatch(text, newText)).toEqual(patch);
        });
    });

    describe('apply patch:', () => {
        beforeAll(() => i = 0);

        it('when added some characters', () => {
            const {newText, patch} = testingData[i];
            expect(patchToText(patch, text)).toEqual(newText);
        });

        it('when removed characters', () => {
            const {newText, patch} = testingData[i];
            expect(patchToText(patch, text)).toEqual(newText);
        });

        it('when text changed', () => {
            const {newText, patch} = testingData[i];
            expect(patchToText(patch, text)).toEqual(newText);
        });
    });
});
