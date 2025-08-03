import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useRouter } from "@/contexts/RouterContext"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { navigate } = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3F4254] text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">G</span>
          </div>
          <div>
            <span className="text-xl font-bold">GETLEAD</span>
            <span className="text-xl font-light ml-2">CRM</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <img 
              src="https://illustrations.popsy.co/amber/app-stats.svg" 
              alt="Analytics dashboard" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Stay automated, go productive</h2>
            <p className="text-gray-300">
              Say goodbye to all the repetitive and boring manual tasks now.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8 shadow-none border-0">
          <div className="space-y-6">
            {!submitted ? (
              <>
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">Forgot password?</h1>
                  <p className="text-gray-600">
                    Enter your Email and we will send an otp for verification
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Back to login page
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">OTP Sent!</h2>
                <p className="text-gray-600">
                  We've sent a verification code to {email}
                </p>
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Back to login
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}