"use client"

import FeatureErrorState from "@/app/(protected)/user/dashboard/_components/feature-error-state"

type UserFeatureErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const UserFeatureErrorPage = ({ error, reset }: UserFeatureErrorPageProps) => {
  return (
    <FeatureErrorState
      title="Feature failed to load"
      message={error.message}
      reset={reset}
    />
  )
}

export default UserFeatureErrorPage
