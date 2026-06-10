
"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Send, 
  Sparkles,
  Loader2,
  Star,
  TrendingDown,
  ShoppingCart,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Trash2
} from "lucide-react"
import Image from "next/image"
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
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { cn } from "@/lib/utils"
import { PlaceHolderImages } from "@/lib/placeholder-images"

type Offer = {
  id: string
  title: string
  price: string
  avgPrice: string
  economy: string
  niche: string
  rating: number
  sales: string
  score: number
  store: string
  status: string
  image: string
  affiliateLink?: string
}

const initialOffers = [
  {
    id: "1",
    title: "Airfryer Philips Walita Essential",
    price: "R$ 449,90",
    avgPrice: "R$ 599,00",
    economy: "25%",
    niche: "Cozinha",
    rating: 4.9,
    sales: "1.2k+",
    score: 98,
    store: "Amazon",
    status: "Ativo",
    image: "kitchen-item",
    affiliateLink: "https://www.amazon.com.br/"
  },
  {
    id: "2",
    title: "Mop Giratório Flash Limp",
    price: "R$ 69,90",
    avgPrice: "R$ 99,00",
    economy: "30%",
    niche: "Limpeza",
    rating: 4.7,
    sales: "5k+",
    score: 95,
    store: "Mercado Livre",
    status: "Ativo",
    image: "cleaning-item",
    affiliateLink: "https://www.mercadolivre.com.br/"
  },
  {
    id: "3",
    title: "Fralda Pampers Premium Care G 80 un",
    price: "R$ 89,90",
    avgPrice: "R$ 119,00",
    economy: "24%",
    niche: "Bebê",
    rating: 4.8,
    sales: "10k+",
    score: 92,
    store: "Magalu",
    status: "Ativo",
    image: "baby-item",
    affiliateLink: "https://www.magazineluiza.com.br/"
  },
  {
    id: "4",
    title: "Jogo de Panelas Tramontina 5 Peças",
    price: "R$ 259,00",
    avgPrice: "R$ 349,00",
    economy: "26%",
    niche: "Cozinha",
    rating: 4.8,
    sales: "2.5k+",
    score: 89,
    store: "Amazon",
    status: "Ativo",
    image: "kitchen-item",
    affiliateLink: "https://www.amazon.com.br/"
  },
  {
    id: "5",
    title: "Organizador de Acrílico Empilhável",
    price: "R$ 34,90",
    avgPrice: "R$ 49,90",
    economy: "30%",
    niche: "Organização",
    rating: 4.5,
    sales: "800+",
    score: 84,
    store: "Shopee",
    status: "Ativo",
    image: "house-item",
    affiliateLink: "https://shopee.com.br/"
  }
]

const emptyManualOffer = {
  title: "",
  price: "",
  avgPrice: "",
  niche: "",
  store: "",
  affiliateLink: "",
  score: "",
  status: "Ativo"
}

export default function DailyOffersPage() {
  const [offers, setOffers] = React.useState<Offer[]>(initialOffers)
  const [isAiLoading, setIsAiLoading] = React.useState(false)
  const [generatedCopy, setGeneratedCopy] = React.useState("")
  const [offerToAnalyse, setOfferToAnalyse] = React.useState<Offer | null>(null)
  const [isAnalyseOpen, setIsAnalyseOpen] = React.useState(false)
  const [isManualOfferOpen, setIsManualOfferOpen] = React.useState(false)
  const [manualOffer, setManualOffer] = React.useState(emptyManualOffer)
  const [selectedNiche, setSelectedNiche] = React.useState("Geral")
  const { toast } = useToast()

  const formatCurrency = (value: string) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) return ""
    return trimmedValue.toLowerCase().startsWith("r$") ? trimmedValue : `R$ ${trimmedValue}`
  }

  const getNumericPrice = (value: string) => {
    const normalizedValue = value.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".")
    return Number(normalizedValue)
  }

  const getEconomy = (price: string, avgPrice: string) => {
    const currentPrice = getNumericPrice(price)
    const averagePrice = getNumericPrice(avgPrice)

    if (!currentPrice || !averagePrice || averagePrice <= currentPrice) return "0%"

    return `${Math.round(((averagePrice - currentPrice) / averagePrice) * 100)}%`
  }

  const getAffiliateLink = (offer: Offer) => offer.affiliateLink || `${offer.store}.com/link-afiliado`

  const getWhatsAppMessage = (offer: Offer) => generatedCopy || `OFERTA DETECTADA!\n\n${offer.title}\n\nDe: ${offer.avgPrice}\nPor: ${offer.price}\n\nLink: ${getAffiliateLink(offer)}`

  const handleGenerateCopy = async (offer: Offer) => {
    setIsAiLoading(true)
    try {
      const result = await generateMarketingMessage({
        offerDescription: `${offer.title} por ${offer.price}. Economia de ${offer.economy}. Loja: ${offer.store}. Link: ${offer.affiliateLink || "sem link informado"}`,
        audienceNiche: selectedNiche
      })
      setGeneratedCopy(`${result.marketingMessage}\n\nLink: ${getAffiliateLink(offer)}`)
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

  const openAnalysis = (offer: Offer) => {
    setOfferToAnalyse(offer)
    setGeneratedCopy("")
    setIsAnalyseOpen(true)
  }

  const handleDeleteOffer = (id: string) => {
    const shouldDelete = window.confirm("Tem certeza que deseja excluir esta oferta?")

    if (!shouldDelete) return

    setOffers((currentOffers) => currentOffers.filter((offer) => offer.id !== id))
    toast({ title: "Oferta excluída", description: "A oferta foi removida da central." })
  }

  const handleManualOfferChange = (field: keyof typeof emptyManualOffer, value: string) => {
    setManualOffer((currentOffer) => ({
      ...currentOffer,
      [field]: value
    }))
  }

  const handleSaveManualOffer = () => {
    const price = formatCurrency(manualOffer.price)
    const avgPrice = formatCurrency(manualOffer.avgPrice)
    const score = Number(manualOffer.score)

    const newOffer: Offer = {
      id: crypto.randomUUID(),
      title: manualOffer.title.trim(),
      price,
      avgPrice,
      economy: getEconomy(price, avgPrice),
      niche: manualOffer.niche.trim(),
      rating: 0,
      sales: "Manual",
      score: Number.isFinite(score) ? score : 0,
      store: manualOffer.store.trim(),
      status: manualOffer.status,
      image: "house-item",
      affiliateLink: manualOffer.affiliateLink.trim()
    }

    setOffers((currentOffers) => [newOffer, ...currentOffers])
    setManualOffer(emptyManualOffer)
    setIsManualOfferOpen(false)
    toast({ title: "Oferta salva!", description: "A nova oferta manual foi adicionada na tabela." })
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 border-emerald-200 bg-emerald-50"
    if (score >= 80) return "text-amber-600 border-amber-200 bg-amber-50"
    return "text-blue-600 border-blue-200 bg-blue-50"
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Central de Análise de Ofertas</h1>
          <p className="text-muted-foreground">Monitore e dispare as melhores oportunidades de conversão.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20" onClick={() => setIsManualOfferOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nova Oferta Manual
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por produto ou nicho..." 
            className="pl-9 bg-background border-none ring-1 ring-border/50 focus-visible:ring-primary/50" 
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none">
            Relatórios
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="font-headline py-4">Oferta</TableHead>
              <TableHead className="font-headline text-center">Score</TableHead>
              <TableHead className="font-headline">Preço Atual</TableHead>
              <TableHead className="font-headline">Economia %</TableHead>
              <TableHead className="font-headline">Avaliação</TableHead>
              <TableHead className="font-headline">Vendas</TableHead>
              <TableHead className="w-[120px] text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="group hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => openAnalysis(offer)}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{offer.title}</div>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground border-none text-[10px] uppercase font-bold">
                      {offer.niche}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-xs border-2",
                    getScoreColor(offer.score)
                  )}>
                    {offer.score}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-foreground">{offer.price}</div>
                  <div className="text-[10px] text-muted-foreground line-through">{offer.avgPrice}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-emerald-600 font-bold">
                    <TrendingDown className="mr-1 h-3 w-3" /> {offer.economy}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" /> {offer.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <ShoppingCart className="h-3 w-3" /> {offer.sales}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10 rounded-full" onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: "Enviando...", description: "Preparando disparo para os grupos selecionados." });
                    }}>
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOffer(offer.id);
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isManualOfferOpen} onOpenChange={setIsManualOfferOpen}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              Nova Oferta Manual
            </DialogTitle>
            <DialogDescription>
              Cadastre uma oportunidade para acompanhar e disparar nos grupos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="manual-title">Nome do produto</Label>
              <Input
                id="manual-title"
                value={manualOffer.title}
                onChange={(event) => handleManualOfferChange("title", event.target.value)}
                placeholder="Ex: Cafeteira espresso compacta"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-price">Preco atual</Label>
              <Input
                id="manual-price"
                value={manualOffer.price}
                onChange={(event) => handleManualOfferChange("price", event.target.value)}
                placeholder="R$ 199,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-avg-price">Preco medio</Label>
              <Input
                id="manual-avg-price"
                value={manualOffer.avgPrice}
                onChange={(event) => handleManualOfferChange("avgPrice", event.target.value)}
                placeholder="R$ 249,90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-niche">Nicho</Label>
              <Input
                id="manual-niche"
                value={manualOffer.niche}
                onChange={(event) => handleManualOfferChange("niche", event.target.value)}
                placeholder="Cozinha"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-store">Loja</Label>
              <Input
                id="manual-store"
                value={manualOffer.store}
                onChange={(event) => handleManualOfferChange("store", event.target.value)}
                placeholder="Amazon"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="manual-affiliate-link">Link de afiliado</Label>
              <Input
                id="manual-affiliate-link"
                value={manualOffer.affiliateLink}
                onChange={(event) => handleManualOfferChange("affiliateLink", event.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-score">Score</Label>
              <Input
                id="manual-score"
                type="number"
                min="0"
                max="100"
                value={manualOffer.score}
                onChange={(event) => handleManualOfferChange("score", event.target.value)}
                placeholder="90"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={manualOffer.status} onValueChange={(value) => handleManualOfferChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pausado">Pausado</SelectItem>
                  <SelectItem value="Expirado">Expirado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setIsManualOfferOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSaveManualOffer}
              disabled={!manualOffer.title.trim() || !manualOffer.price.trim() || !manualOffer.avgPrice.trim()}
            >
              Salvar Oferta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAnalyseOpen} onOpenChange={setIsAnalyseOpen}>
        <DialogContent className="sm:max-w-[800px] overflow-hidden">
          {offerToAnalyse && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                  Análise Detalhada: {offerToAnalyse.title}
                </DialogTitle>
                <DialogDescription>
                  Dados consolidados de performance e histórico de preços.
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-8 py-4">
                <div className="space-y-6">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    <Image 
                      src={PlaceHolderImages.find(img => img.id === offerToAnalyse.image)?.imageUrl || "https://picsum.photos/400/400"} 
                      alt={offerToAnalyse.title}
                      fill
                      className="object-cover"
                      data-ai-hint={PlaceHolderImages.find(img => img.id === offerToAnalyse.image)?.imageHint || "product"}
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-white text-lg font-bold py-1 px-3">
                      Score {offerToAnalyse.score}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Preço Médio</p>
                      <p className="text-sm font-semibold text-muted-foreground line-through">{offerToAnalyse.avgPrice}</p>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-[10px] uppercase font-bold text-primary">Preço Hoje</p>
                      <p className="text-xl font-bold text-primary">{offerToAnalyse.price}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-emerald-600">Economia</p>
                      <p className="text-lg font-bold text-emerald-600">{offerToAnalyse.economy}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-[10px] uppercase font-bold text-indigo-600">Vendas (Mês)</p>
                      <p className="text-lg font-bold text-indigo-600">{offerToAnalyse.sales}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" /> Refinar por Público
                    </Label>
                    <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                      <SelectTrigger className="bg-muted/30">
                        <SelectValue placeholder="Selecione o nicho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Geral">Público Geral</SelectItem>
                        <SelectItem value="Mães e Pais">Mães e Pais</SelectItem>
                        <SelectItem value="Aposentados">Aposentados</SelectItem>
                        <SelectItem value="Pobres e Economistas">Focados em Economia</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2 border-primary/30 text-primary hover:bg-primary/5"
                      onClick={() => handleGenerateCopy(offerToAnalyse)}
                      disabled={isAiLoading}
                    >
                      {isAiLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      {generatedCopy ? "Regerar Mensagem com IA" : "Gerar Mensagem de WhatsApp"}
                    </Button>
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label>Texto para Disparo (WhatsApp)</Label>
                    <div className="relative h-[240px]">
                      <Textarea 
                        className="h-full resize-none bg-muted/20 border-muted p-4 leading-relaxed font-body text-sm"
                        value={getWhatsAppMessage(offerToAnalyse)}
                        onChange={(e) => setGeneratedCopy(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0 border-t pt-4">
                <Button variant="ghost" className="text-muted-foreground" onClick={() => {
                  if (offerToAnalyse.affiliateLink) {
                    window.open(offerToAnalyse.affiliateLink, '_blank')
                    return
                  }

                  toast({ title: "Link nao informado", description: "Esta oferta ainda nao possui link de afiliado." })
                }}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Ver na {offerToAnalyse.store}
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => {
                    navigator.clipboard.writeText(getWhatsAppMessage(offerToAnalyse))
                    toast({ title: "Copiado!", description: "Mensagem pronta para colar no WhatsApp." })
                  }}>
                    <Copy className="mr-2 h-4 w-4" /> Copiar Texto
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Send className="mr-2 h-4 w-4" /> Enviar para Grupos
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
