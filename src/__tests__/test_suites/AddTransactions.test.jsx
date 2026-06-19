import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../../components/App'

describe('Add transactions', () => {
	it('adds a new transaction to the frontend and posts it to the backend', async () => {
		const initialTransactions = [
			{
				id: '1',
				date: '2019-12-01',
				description: "Paycheck from Bob's Burgers",
				category: 'Income',
				amount: 1000,
			},
		]

		const newTransaction = {
			id: '2',
			date: '2024-06-19',
			description: 'Coffee with a client',
			category: 'Food',
			amount: '-12.50',
		}

		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				json: () => Promise.resolve(initialTransactions),
				ok: true,
				status: 200,
			})
			.mockResolvedValueOnce({
				json: () => Promise.resolve(newTransaction),
				ok: true,
				status: 201,
			})

		global.fetch = fetchMock

		const { container } = render(<App />)

		await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(initialTransactions.length + 1))

		fireEvent.change(container.querySelector('input[type="date"]'), {
			target: { value: newTransaction.date },
		})
		fireEvent.change(screen.getByPlaceholderText('Description'), {
			target: { value: newTransaction.description },
		})
		fireEvent.change(screen.getByPlaceholderText('Category'), {
			target: { value: newTransaction.category },
		})
		fireEvent.change(screen.getByPlaceholderText('Amount'), {
			target: { value: newTransaction.amount },
		})

		fireEvent.submit(screen.getByText('Add Transaction').closest('form'))

		await waitFor(() => {
			expect(fetchMock).toHaveBeenNthCalledWith(
				2,
				'http://localhost:6001/transactions',
				expect.objectContaining({ method: 'POST' }),
			)
		})

		await waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(3))
		expect(screen.getByText(newTransaction.description)).toBeInTheDocument()
		expect(screen.getByText(newTransaction.category)).toBeInTheDocument()
	})
})
