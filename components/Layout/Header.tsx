'use client';

import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import useGetProfile from '@/hooks/Profile/useGetProfile';
import { useEffect, useState } from 'react';

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate, data } = useGetProfile();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  useEffect(() => {
    if (user?.id) {
      mutate(user.id);
    }
  }, [user?.id]);

  return (
    <header className="bg-white shadow-sm z-30 sticky top-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <FiMenu size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex justify-end items-center gap-8">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Image
                  src="/image.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
                <div className="p-4 bg-blue-600 text-white rounded-t-md">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/image.png"
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h6 className="font-semibold">{user?.name}</h6>
                      <span className="text-xs">Customer</span>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
