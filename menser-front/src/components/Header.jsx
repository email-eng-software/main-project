/* eslint react/prop-types: 0 */
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Avatar, Dropdown, Navbar, Sidebar } from 'flowbite-react';
import { HiInbox } from 'react-icons/hi';
import setToast from '../utils/toast.utils';
import { useSaveMessageDraft } from '../hooks/query/messages';
import useAuthStore from '../stores/auth';

function hasNotifications(notifications) {
  if (notifications > 0) {
    return (
      <Sidebar.Item href="/" icon={HiInbox} label={notifications}>
        Inbox
      </Sidebar.Item>
    );
  }
  return (
    <Sidebar.Item href="/" icon={HiInbox}>
      Inbox
    </Sidebar.Item>
  );
}
const Spinner = (
  <div role="status">
    <svg
      aria-hidden="true"
      className="absolute bottom-10 right-10 w-16 h-16  flex items-center justify-center z-10 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default function Layout({ name = 'User', notifications = 0, children }) {
  const userId = useAuthStore((state) => state.auth?.user._id);
  const navigate = useNavigate();

  const { mutate: saveMessageDraft, isLoading } = useSaveMessageDraft({
    onSuccess: (draft) => navigate(`/draft/${draft._id}`),

    onError: (err) => {
      console.error(err);
      setToast(
        'error',
        'Ocorreu um problema no servidor. Tente novamente mais tarde'
      );
    },
  });

  return (
    <div className="h-full flex flex-col relative">
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          aria-label="add"
          type="button"
          onClick={() => saveMessageDraft({ sender: userId })}
          className="absolute bottom-10 right-10 bg-green-300 w-16 h-16 rounded flex items-center justify-center z-10"
        >
          <div>
            <svg
              className="w-10 h-10 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
          </div>
        </button>
      )}

      <Navbar fluid>
        <Link to="/">
          <img
            src="../favicon.ico"
            className="mr-3 h-6 sm:h-9"
            alt="Menser Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Menser
          </span>
        </Link>
        <div className="flex order-last">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <>
                <span className="flex font-bold items-center text-sm mr-3">
                  {name}
                </span>
                <Avatar
                  alt="User settings"
                  img="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  rounded
                />
              </>
            }
          >
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <div className="flex-1 flex">
        <Sidebar>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {hasNotifications(notifications)}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
