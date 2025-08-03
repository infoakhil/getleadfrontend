import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "@/contexts/RouterContext"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [countryCode, setCountryCode] = useState("971")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { login } = useAuth()
  const { navigate } = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const fullMobile = `+${countryCode}${mobileNumber}`
      await login(fullMobile, password)
      navigate("/")
    } catch (err) {
      setError("Invalid mobile number or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900 to-purple-700 text-white p-12 flex-col justify-between">
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
              src="https://illustrations.popsy.co/amber/remote-work.svg" 
              alt="Team collaboration" 
              className="w-full max-w-md mx-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Focus on what matters most</h2>
            <p className="text-purple-200">
              Manage all your tasks effectively and stay focused on the more important tasks
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8 shadow-none border-0">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Login to your account!</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile number</Label>
                <div className="flex gap-2">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="971">🇦🇪 971</SelectItem>
                      <SelectItem value="1">🇺🇸 1</SelectItem>
                      <SelectItem value="44">🇬🇧 44</SelectItem>
                      <SelectItem value="91">🇮🇳 91</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type your password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Forgot Password ?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                Signup
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}