"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { toast } from "react-toastify"
import axiosAdmin from "@/service/axios/axiosAdmin"
import useAdminAuthStore from "@/service/store/AdminAuthStore"
import { Card, CardContent } from "@/components/ui/card"

// Types
interface User {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "blocked"
}

interface ApiError {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
  message?: string
}

// Add loading skeleton
const LoadingSkeleton = () => (
  <TableRow>
    <TableCell colSpan={5}>
      <div className="flex justify-center items-center space-x-4 py-4">
        <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin" />
        <span>Loading users...</span>
      </div>
    </TableCell>
  </TableRow>
)

export function UserManagement() {
  // State
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Hooks
  const router = useRouter()
  const { loggedIn, checkAuth } = useAdminAuthStore()

  // Authentication check on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth()
        setInitialAuthCheckDone(true)
        console.log("Auth check done, user is logged in:", loggedIn)
      } catch (error) {
        console.error("Auth check failed:", error)
        router.replace("/admin/login")
      }
    }

    verifyAuth()
  }, [checkAuth, router, loggedIn])

  // Redirect if not logged in after auth check
  useEffect(() => {
    console.log("Initial auth check done:", initialAuthCheckDone, "Logged in:", loggedIn)
    if (initialAuthCheckDone && !loggedIn) {
      router.replace("/admin/login")
    }
  }, [initialAuthCheckDone, loggedIn, router])

  // Data fetching
  const fetchUsers = async () => {
    try {
      const { data } = await axiosAdmin().get("/getUsers")
      setUsers(data)
    } catch (error) {
      const apiError = error as ApiError
      console.error("Fetch users error:", apiError)
      
      if (apiError.response?.status === 401) {
        router.replace("/admin/login")
        return
      }
      
      toast.error(
        apiError.response?.data?.message || 
        "Failed to fetch users. Please try again later."
      )
    } finally {
      setLoading(false)
    }
  }

  // Fetch users when authenticated
  useEffect(() => {
    if (loggedIn && initialAuthCheckDone) {
      fetchUsers()
    }
  }, [loggedIn, initialAuthCheckDone])

  // User actions
  const handleToggleStatus = useCallback(async (userId: string, currentStatus: "active" | "blocked") => {
    setLoading(true)
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active"
      await axiosAdmin().post(`/admin/users/${userId}/status`, { status: newStatus })
      toast.success(`User ${newStatus === "blocked" ? "blocked" : "unblocked"} successfully`)
      await fetchUsers()
    } catch (error) {
      const apiError = error as ApiError
      console.error("Toggle status error:", apiError)
      
      if (apiError.response?.status === 401) {
        router.replace("/admin/login")
        return
      }
      
      toast.error(
        apiError.response?.data?.message || 
        "Failed to update user status. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }, [])

  // Search functionality
  const filteredUsers = useMemo(() => 
    users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
    ),
    [users, searchQuery]
  )

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const ITEMS_PER_PAGE = 10

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  // Early returns for loading and auth states
  if (!initialAuthCheckDone) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Checking authentication...</p>
      </div>
    )
  }

  if (!loggedIn) {
    return null // Will redirect due to useEffect
  }

  // Main render
  return (
    <Card className="m-6">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, email, or phone"
            className="w-60"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
              <TableCell className="font-semibold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingSkeleton />
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="text-center py-4 text-gray-500">
                    No users found matching "{searchQuery}"
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow 
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-white ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      variant={user.status === "active" ? "destructive" : "default"}
                      size="sm"
                    >
                      {user.status === "active" ? "Block" : "Unblock"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center gap-2">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            size="sm"
          >
            Previous
          </Button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}