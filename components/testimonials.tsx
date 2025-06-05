"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Locataire",
    content:
      "Grâce à Dwell, j'ai trouvé mon appartement en seulement 2 semaines ! La communication directe avec le propriétaire a été un vrai plus.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SM",
    rating: 5,
  },
  {
    name: "Thomas Dubois",
    role: "Propriétaire",
    content:
      "Je gère plusieurs biens et Dwell me fait gagner un temps précieux. Les profils des locataires sont bien détaillés, ce qui facilite la sélection.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TD",
    rating: 5,
  },
  {
    name: "Julie Leroy",
    role: "Locataire",
    content:
      "Interface intuitive et recherche très efficace. J'ai pu filtrer selon mes critères exacts et trouver rapidement un logement qui me correspond.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JL",
    rating: 4,
  },
  {
    name: "Pierre Moreau",
    role: "Propriétaire",
    content:
      "La vérification des profils est rassurante. J'ai pu louer mon bien à des personnes de confiance sans passer par une agence coûteuse.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PM",
    rating: 5,
  },
  {
    name: "Emma Bernard",
    role: "Locataire",
    content:
      "Le processus de location était transparent du début à la fin. Je recommande vivement cette plateforme à tous ceux qui cherchent un logement.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EB",
    rating: 5,
  },
  {
    name: "Laurent Petit",
    role: "Propriétaire",
    content:
      "Dwell m'a permis de trouver des locataires sérieux rapidement. L'interface est simple à utiliser même pour quelqu'un qui n'est pas très à l'aise avec la technologie.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LP",
    rating: 4,
  },
]

export function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 3
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage)

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount)
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 py-8"
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card
                className="bg-white border border-[#ddd] hover:border-accent/50 transition-colors h-full"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{testimonial.name}</h3>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#171717]">{testimonial.content}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {pageCount > 1 && (
        <motion.div
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            aria-label="Page précédente"
            className="border border-[#171717] text-[#171717] hover:border-[#171717] hover:bg-[#171717]/10"
          >
            <ChevronLeft className="h-4 w-4 text-[#171717]" />
          </Button>

          {Array.from({ length: pageCount }).map((_, i) => (
            <Button
              key={i}
              variant={i === currentPage ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(i)}
              aria-label={`Page ${i + 1}`}
              className={`w-8 h-8 ${
                i === currentPage
                  ? "bg-primary hover:bg-primary/90"
                  : "border border-[#171717] text-[#171717] hover:border-[#171717] hover:bg-[#171717]/10"
              }`}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            aria-label="Page suivante"
            className="border border-[#171717] text-[#171717] hover:border-[#171717] hover:bg-[#171717]/10"
          >
            <ChevronRight className="h-4 w-4 text-[#171717]" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
