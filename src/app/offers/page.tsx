
"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Send, 
  Sparkles,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { generateMarketingMessage } from "@/ai/flows/generate-marketing-message"
import { useToast } from "@/hooks/use-toast"

const initialOffers = [
  {
    id: "1",
    title: "iPhone 15 Pro Max 256GB",
    price: "R$ 8.999,00",
    originalPrice: "R$ 10.999,00",
    niche: "Eletrônicos",
    store: "Amazon",
    status: "Ativo"
  },
  {
    id: "2",
    title: "Fritadeira Elétrica Mondial",
    price: "R$ 349,90",
    originalPrice: "R$ 499,90",
    niche: "Casa",
    store: "Mercado Livre",
    status: "Ativo"
  },
  {
    id: "3",
    title: "Tênis Nike Air Force 1",
    price: "R$ 599,00",
    originalPrice: "R$ 799,00",
    niche: "Moda",
    store: "Netshoes",
    status: "Pausado"
  }
]

export default function DailyOffersPage() {
  const [offers, setOffers] = React.useState(initialOffers)
  const [isAiLoading, setIsAiLoading] = React.useState(false)
  const [generatedCopy, setGeneratedCopy] = React.useState("")
  const [offerToGenerate, setOfferToGenerate] = React.useState<any>(null)
  const [selectedNiche, setSelectedNiche] = React.useState("Geral")
  const { toast } = useToast()

  const handleGenerateCopy = async () => {
    if (!offerToGenerate) return
    
    setIsAiLoading(true)
    try {
      const result = await generateMarketingMessage({
        offerDescription: `${offerToGenerate.title} por ${offerToGenerate.price}. Loja: ${offerToGenerate.store}`,
        audienceNiche: selectedNiche
      })
      setGeneratedCopy(result.marketingMessage)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar copy",
        description: "Não foi possível gerar a mensagem de marketing no momento."
      })
    } finally {
      setIsAiLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Ofertas Diárias</h1>
          <p className="text-muted-foreground">Gerencie as promoções do dia para seus grupos.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Nova Oferta
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar ofertas..." 
            className="pl-9 bg-background border-none ring-1 ring-border/50 focus-visible:ring-primary/50" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            Exportar
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-headline py-4">Oferta</TableHead>
              <TableHead className="font-headline">Preço</TableHead>
              <TableHead className="font-headline">Nicho</TableHead>
              <TableHead className="font-headline">Loja</TableHead>
              <TableHead className="font-headline text-center">Status</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="group hover:bg-muted/20">
                <TableCell>
                  <div className="font-medium text-foreground">{offer.title}</div>
                  <div className="text-xs text-muted-foreground line-through">{offer.originalPrice}</div>
                </TableCell>
                <TableCell className="font-bold text-primary">{offer.price}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-medium">
                    {offer.niche}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{offer.store}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    className={offer.status === "Ativo" 
                      ? "bg-emerald-50 text-emerald-600 border-none" 
                      : "bg-rose-50 text-rose-600 border-none"
                    }
                  >
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => {
                        setOfferToGenerate(offer)
                        setGeneratedCopy("")
                      }}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <span className="flex items-center">
                              <Sparkles className="mr-2 h-4 w-4 text-amber-500" /> Gerar Copy IA
                            </span>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="font-headline flex items-center">
                                <Sparkles className="mr-2 h-5 w-5 text-amber-500" /> 
                                Assistente de Copy IA
                              </DialogTitle>
                              <DialogDescription>
                                Criaremos uma mensagem persuasiva para o produto: <span className="font-bold text-foreground">{offerToGenerate?.title}</span>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                              <div className="space-y-2">
                                <Label>Público-alvo / Nicho</Label>
                                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o nicho" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Geral">Público Geral</SelectItem>
                                    <SelectItem value="Mães e Pais">Mães e Pais</SelectItem>
                                    <SelectItem value="Gamers">Gamers</SelectItem>
                                    <SelectItem value="Fretistas de Plantão">Fretistas de Plantão</SelectItem>
                                    <SelectItem value="Estudantes">Estudantes</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Mensagem Gerada</Label>
                                <div className="relative">
                                  <Textarea 
                                    value={generatedCopy}
                                    onChange={(e) => setGeneratedCopy(e.target.value)}
                                    placeholder="Aguardando geração..."
                                    className="min-h-[200px] leading-relaxed resize-none"
                                  />
                                  {isAiLoading && (
                                    <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center rounded-md">
                                      <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <span className="text-xs font-medium text-primary">Escrevendo sua oferta...</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="gap-2 sm:gap-0">
                              <Button 
                                variant="outline" 
                                onClick={handleGenerateCopy}
                                disabled={isAiLoading}
                              >
                                {generatedCopy ? "Regerar" : "Gerar Agora"}
                              </Button>
                              <Button 
                                className="bg-primary"
                                disabled={!generatedCopy}
                                onClick={() => {
                                  toast({
                                    title: "Copiado!",
                                    description: "A mensagem foi copiada para a área de transferência."
                                  })
                                  navigator.clipboard.writeText(generatedCopy)
                                }}
                              >
                                Copiar e Enviar
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Ver na Loja
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Send className="mr-2 h-4 w-4" /> Enviar Agora
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
