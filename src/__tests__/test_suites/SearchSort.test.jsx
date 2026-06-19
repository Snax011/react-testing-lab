import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../../components/App'
import transactionData from '../../../db.json'

describe('Search and sort transactions', () => {
	it('filters the page when the search input changes', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: () => Promise.resolve(transactionData.transactions),
			ok: true,
			status: 200,
		})

		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('Chipotle')).toBeInTheDocument()
		})

		fireEvent.change(screen.getByPlaceholderText('Search your Recent Transactions'), {
			target: { value: 'Food' },
		})

		expect(screen.getAllByRole('row')).toHaveLength(5)
		expect(screen.getByText('Chipotle')).toBeInTheDocument()
		expect(screen.queryByText('Lyft Ride')).not.toBeInTheDocument()
	})

	it('sorts transactions when a sort option is selected', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: () => Promise.resolve(transactionData.transactions),
			ok: true,
			status: 200,
		})

		render(<App />)

		await waitFor(() => {
			expect(screen.getByText('Chipotle')).toBeInTheDocument()
		})

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'description' },
		})

		expect(screen.getAllByRole('row')[1]).toHaveTextContent('Birthday Check from Grandma')

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: 'category' },
		})

		expect(screen.getAllByRole('row')[1]).toHaveTextContent('Tickets, Flatiron Multiplex Cinemas')
	})
})
