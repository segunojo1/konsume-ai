import Header from '@/modules/auth/login/Header'
import '@testing-library/jest-dom'
import {cleanup, fireEvent, render} from '@testing-library/react';
import {describe, expect, jest, test, it} from '@jest/globals'

describe('headderrrrr', () => {
    it('renders the text', () => {
        const {getByRole} = render(<Header />);
        const ttt = getByRole('heading', {level: 2});
        const ttval = ttt.textContent;
        expect(ttval).toEqual('Thank you for ')
    })
})