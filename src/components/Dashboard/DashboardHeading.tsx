import React, { FC, ReactNode } from 'react'

type Props = {
  title: string
  icon: ReactNode
  children: ReactNode
}

export const DashboardHeading: FC<Props> = ({ title, icon, children }) => {
  return (
    <div className="flex items-center justify-between py-[14px] px-5 border border-[#d0d7de] rounded-md bg-white min-h-[72px]">
      <h1 className="flex items-center gap-2.5">
        {icon}
        <span className="inline-block whitespace-nowrap font-medium">
          {title}
        </span>
      </h1>
      <div className="flex items-center gap-3">{children}</div>
    </div>
  )
}
