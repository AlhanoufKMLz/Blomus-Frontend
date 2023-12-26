import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'
import { DiscountCode } from '../../../types/types'
import { deleteDiscountCodeThunk } from '../../../redux/slices/discountCode/discountCodeSlice'
import DiscountCodeFormModal from './DiscountCodeFormModal'

export function DiscountCodesManager() {
  const state = useSelector((state: RootState) => state.discountCodes)
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountCode | null>()

  //Open edit discount modal
  function handleEdit(code: DiscountCode) {
    setSelectedDiscount(code)
    setIsModalOpen(true)
  }

  //Open add discount form
  function addDiscountForm() {
    setSelectedDiscount(null)
    setIsModalOpen(true)
  }

  //Display discount codes table
  return (
    <div className="flex flex-col min-h-screen align-middle">
      {/* discount codes table */}
      <div className="max-h-[700px] overflow-y-auto ml-16">
        <table className="md:mx-40 md:my-8 w-9/12">
          <tbody>
            <tr className="text-left text-primary_pink">
              <th>Code</th>
              <th>Expiration</th>
              <th className='text-center'>Percentage</th>
            </tr>
            {state.codes.map((code) => (
              <tr className="border-t-2 border-zinc_secondery" key={code._id}>
                <td className="text-primary_green py-5">{code.code}</td>
                <td className="text-primary_green py-5">{new Date(code.expirationDate)?.toLocaleDateString()}</td>
                <td className="text-primary_green text-center">{code.discountPercentage} %</td>
                <td className="text-right">
                  <button
                    className="text-primary_green hover:text-primary_pink"
                    onClick={() => handleEdit(code)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                      <path
                        d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"
                        stroke="#727E7E"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                        fill="none"
                        stroke="#727E7E"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
                <td className="text-right">
                  <button
                    className="text-primary_pink"
                    onClick={() => dispatch(deleteDiscountCodeThunk(code._id))}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* add discount button */}
      <button
        className="fixed bg-primary_green bottom-8 right-8 text-white h-14 w-14 rounded-full text-4xl flex items-center justify-center shadow-md hover:shadow-none hover:bg-primary_pink hover:text-primary_green shadow-shadow"
        onClick={addDiscountForm}>
        +
      </button>

      {/* Edit Modal */}
      {selectedDiscount && (
        <DiscountCodeFormModal
          isOpen={isModalOpen}
          discountCode={selectedDiscount}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {/* Add Modal */}
      {!selectedDiscount && (
        <DiscountCodeFormModal isOpen={isModalOpen} discountCode={null} setIsModalOpen={setIsModalOpen} />
      )}
      
    </div>
  )
}
