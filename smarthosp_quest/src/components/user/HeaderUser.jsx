import React from 'react'
import { Avatar } from 'antd'
import { User } from 'lucide-react'
import useGlobalStore from '../../store/global-store'

const HeaderUser = () => {

  const token = useGlobalStore((state) => state.token)
  const user = useGlobalStore((state) => state.user)

  return (
    <header className='relative bg-white h-16 flex items-center px-6'>
      <div className='absolute right-5'>
        <div className='flex items-center gap-1'>
          {
            token
              ?
              <>
                <Avatar className='bg-green-600' icon={<User />} />
                <p>{user.firstname_th + ' ' + user.lastname_th + ' [' + user.hcode + ']'} [{user.objective}]</p>
              </>
              : null
          }
        </div>
      </div>
    </header>
  )
}

export default HeaderUser