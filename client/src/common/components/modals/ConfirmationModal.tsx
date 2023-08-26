import React, { Fragment, PropsWithChildren } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Button } from 'src/common/interactions/Button';

import CrossIcon from 'src/assets/images/cross-icon.svg';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancelModal: () => void;
  title?: string;
  slim?: boolean;
}

export const ConfirmationModal = React.memo((props: PropsWithChildren<ConfirmationModalProps>) => {
  const { isOpen, onCancelModal, slim = false, title = '', children } = props;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onCancelModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${slim ? 'p-2' : 'p-5'
                } rounded-xl inline-block w-full max-w-lg  pb-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl`}
            >
              <Dialog.Title as="h2" className="font-medium leading-6 text-gray-900 flex justify-between items-start">
                <div className="border-b-2 pb-3 mx-auto mt-2">
                  <span className="text-3xl">{title}</span>
                </div>
                <Button.Link className="rounded-full" type="button" onClick={onCancelModal}>
                  <img src={CrossIcon} style={{ height: 30 }} alt="close modal" />
                </Button.Link>
              </Dialog.Title>

              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
});
