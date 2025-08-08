'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { FaHouse, FaShopify, FaCreditCard, FaCircleUser, FaGift, FaUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import {
    FaLayerGroup,
    FaUsers,
    FaBoxOpen,
    FaReceipt,
    FaWrench,
    FaCode,
} from "react-icons/fa6";


interface SidebarProps {
    sidebarOpen: boolean;
    hoveredSidebar: boolean;
    toggleSidebar: () => void;
    setHoveredSidebar: (value: boolean) => void;
}

const Sidebar = ({ sidebarOpen, hoveredSidebar, toggleSidebar, setHoveredSidebar }: SidebarProps) => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <aside
            onMouseEnter={() => !sidebarOpen && setHoveredSidebar(true)}
            onMouseLeave={() => !sidebarOpen && setHoveredSidebar(false)}
            className={`fixed top-0 left-0 h-full bg-white shadow-md z-30 transition-all duration-300 ease-in-out  ${sidebarOpen || hoveredSidebar ? 'w-64' : 'w-20'}`}>

            {/* Logo Section */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <Link href="/" className="flex items-center min-w-max">
                    <Image
                        src="/fillerbay.png"
                        alt="AeronPay Logo"
                        width={40}
                        height={40}
                        className="transition-all rounded-lg"
                    />
                    {(sidebarOpen || hoveredSidebar) && (
                        <span className="text-xl font-bold text-blue-600 ml-2 whitespace-nowrap transition-opacity duration-300">
                            Filler Bay
                        </span>
                    )}
                </Link>

                <button
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-gray-700 lg:hidden"
                >
                    <FiMenu size={24} />
                </button>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-19 h-19 rounded-full border-2 border-gray-200 shadow-sm overflow-hidden transition-all">
                        <Image
                            src="/fillerbay.png"
                            alt="User Profile"
                            fill
                            className="object-fill"
                        />
                    </div>
                    {(sidebarOpen || hoveredSidebar) && (
                        <div className="text-center space-y-0.5 transition-opacity duration-300">
                            <h4 className="font-semibold text-gray-800 text-md whitespace-nowrap">{user?.name}</h4>
                            <span className="text-gray-500 text-xs font-medium">Name</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 overflow-hidden">
    <ul className="space-y-1">
        <li>
            <Link href="/Category" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50 text-blue-600`}>
                <FaLayerGroup className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Category</span>}
            </Link>
        </li>
        <li>
            <Link href="/User" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                <FaUsers className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Users</span>}
            </Link>
        </li>
        <li>
            <Link href="/Products" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                <FaBoxOpen className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Products</span>}
            </Link>
        </li>
        <li>
            <Link href="/Orders" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                <FaReceipt className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Orders</span>}
            </Link>
        </li>
        {/* <li>
            <Link href="/Management" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                <FaWrench className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">Management</span>}
            </Link>
        </li> */}
        <li>
            <Link href="/whats-app" className={`flex items-center p-3 rounded-lg transition-all duration-200 ${sidebarOpen || hoveredSidebar ? 'px-4' : 'px-3 justify-center'} hover:bg-blue-50`}>
                <FaCode className="text-lg min-w-[24px]" />
                {(sidebarOpen || hoveredSidebar) && <span className="ml-3 whitespace-nowrap">What's Api</span>}
            </Link>
        </li>
    </ul>
</nav>

        </aside>
    );
};

export default Sidebar;
