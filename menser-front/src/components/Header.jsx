import React from "react";

/* eslint react/prop-types: 0 */

import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import { HiInbox } from "react-icons/hi";

function hasNotifications(notifications) {
    if (notifications > 0) {
        return (
            <Sidebar.Item href="/" icon={HiInbox} label={notifications}>
                Inbox
            </Sidebar.Item>
        )
    }
    return (
        <Sidebar.Item href="/" icon={HiInbox}>
            Inbox
        </Sidebar.Item>
    )
}


export default function Layout({ name = "User", notifications = 0, children }) {
    return (
        <div className="h-full flex flex-col relative">
            <a aria-label="add" href="/new" className="absolute bottom-10 right-10 bg-green-300 w-16 h-16 rounded flex items-center justify-center z-10">
                <div>
                    <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                    </svg>

                </div>
            </a>

            <Navbar fluid>
                <Navbar.Brand href="/">
                    <img src="../favicon.ico" className="mr-3 h-6 sm:h-9" alt="Menser Logo" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Menser</span>
                </Navbar.Brand>
                <div className="flex order-last">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<>
                            <span className="flex font-bold items-center text-sm mr-3">{name}</span>
                            <Avatar alt="User settings" img="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" rounded />
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
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
