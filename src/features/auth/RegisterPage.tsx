import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "@/contexts/RouterContext"

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [countryCode, setCountryCode] = useState("971")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { login } = useAuth()
  const { navigate } = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    
    try {
      // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // After successful registration, log the user in
      const fullMobile = `+${countryCode}${formData.mobile}`
      await login(fullMobile, formData.password)
      navigate("/")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#3F4254] text-white p-12 flex-col justify-between">
        <div className="space-y-6 flex-1 flex flex-col justify-center">
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

      {/* Right side - Registration form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md p-8 shadow-none border-0">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">
                Start closing more deals<br />
                with <span className="text-red-600">Getlead</span>
              </h1>
              <p className="text-gray-600">
                Start your 14-day free trial. No credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

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
                    name="mobile"
                    type="tel"
                    placeholder="eg: +91 9447 752 786"
                    value={formData.mobile}
                    onChange={handleInputChange}
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create new password"
                    value={formData.password}
                    onChange={handleInputChange}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => navigate("/login")}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}