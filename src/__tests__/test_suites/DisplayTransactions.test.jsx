import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../../components/App'
import transactionData from '../../../db.json'

describe('Display transactions', () => {
	it('renders the transactions returned from the backend on startup', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: () => Promise.resolve(transactionData.transactions),
			ok: true,
			status: 200,
		})

		render(<App />)

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith('http://localhost:6001/transactions')
		})

		expect(screen.getAllByRole('row')).toHaveLength(transactionData.transactions.length + 1)
		expect(screen.getByText('Chipotle')).toBeInTheDocument()
	})
})
