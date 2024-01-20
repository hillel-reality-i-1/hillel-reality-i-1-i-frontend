import { useState } from 'react'

export const useModalToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return [isOpen, toggleModal, setIsOpen]
}
