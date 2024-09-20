import '@testing-library/jest-dom'
import {describe, expect, it} from '@jest/globals'
import { render } from '@testing-library/react'
import BioData from '@/modules/setup-account/BioData'
import { SetupProvider } from '@/context/SetupContext'
describe('', () => {
    it('all inputs for biodata are empty', () => {
        const {queryAllByRole} = render(<SetupProvider><BioData /></SetupProvider>);
        const inputs = queryAllByRole('textbox');
        inputs.forEach(input => {
            expect(input.value).toBe(''); // Check if the input value is empty
        });
    })
})