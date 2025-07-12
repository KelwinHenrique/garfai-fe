interface SelectAccessRouteProps {
  children: React.ReactNode
  requireMerchantId?: boolean
}

export const SelectAccessRoute = ({ 
  children, 
}: SelectAccessRouteProps) => {
  return <>{children}</>
} 