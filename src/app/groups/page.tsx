
"use client"

import * as React from "react"
import { Users, Plus, Hash, Settings2, MoreHorizontal, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const groups = [
  {
    id: "1",
    name: "Ofertas Tech Brasil",
    platform: "WhatsApp",
    members: 842,
    niches: ["Eletrônicos", "Games"],
    status: "connected"
  },
  {
    id: "2",
    name: "Casa & Cozinha VIP",
    platform: "WhatsApp",
    members: 1250,
    niches: ["Casa", "Cozinha", "Decoração"],
    status: "connected"
  },
  {
    id: "3",
    name: "Promoções Kindle",
    platform: "WhatsApp",
    members: 312,
    niches: ["Livros", "Educação"],
    status: "disconnected"
  },
  {
    id: "4",
    name: "Beleza Feminina 2024",
    platform: "WhatsApp",
    members: 567,
    niches: ["Beleza", "Saúde"],
    status: "connected"
  }
]

export default function GroupsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold text-foreground">Grupos & Segmentação</h1>
          <p className="text-muted-foreground">Gerencie seus canais de distribuição por nichos.</p>
        </div>
        <Button className="bg-primary rounded-lg shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Adicionar Grupo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id} className="border-none shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  group.status === "connected" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                )}>
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-headline font-bold">{group.name}</CardTitle>
                  <CardDescription className="flex items-center text-xs">
                    {group.platform} • {group.members} membros
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {group.niches.map((niche) => (
                  <Badge key={niche} variant="secondary" className="bg-sidebar-accent text-sidebar-primary border-none text-[10px] uppercase font-bold tracking-tight">
                    <Hash className="h-2 w-2 mr-1" /> {niche}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center border-t border-muted/30">
              <div className="flex items-center text-xs text-muted-foreground">
                <div className={cn(
                  "h-2 w-2 rounded-full mr-2",
                  group.status === "connected" ? "bg-emerald-500" : "bg-rose-500"
                )} />
                {group.status === "connected" ? "Conectado" : "Desconectado"}
              </div>
              <Button variant="ghost" size="sm" className="text-primary h-8 text-xs font-bold hover:bg-primary/5">
                <Settings2 className="h-3 w-3 mr-1" /> Configurar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
