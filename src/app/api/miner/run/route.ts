import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

type GroupRow = {
  id: string
  name: string | null
  niche: string | null
  status: string | null
}

const normalizeText = (value: string | null) => value?.trim().toLowerCase() ?? ""
const inactiveStatuses = new Set(["inativo", "inactive", "pausado", "paused", "arquivado", "archived"])

const isValidGroup = (group: GroupRow) => (
  normalizeText(group.niche) === "casa" &&
  !inactiveStatuses.has(normalizeText(group.status))
)

const errorResponse = (message: string) => NextResponse.json(
  { success: false, sucesso: false, error: message },
  { status: 500 }
)

export async function POST() {
  const now = new Date().toISOString()
  const offerTitle = "Oferta minerada - Kit Organização Casa"
  const offerLink = "https://exemplo.com/oferta-minerada"

  const { data: miningRun, error: miningRunError } = await supabase
    .from("mining_runs")
    .insert({
      source: "simulador",
      status: "Concluído",
      niche: "Casa",
      offers_found: 1,
      campaigns_created: 1,
      finished_at: now
    })
    .select("*")
    .single()

  if (miningRunError) {
    return errorResponse(miningRunError.message)
  }

  const { data: offer, error: offerError } = await supabase
    .from("offers")
    .insert({
      title: offerTitle,
      price: "R$ 79,90",
      avg_price: "R$ 129,90",
      economy: "R$ 50,00",
      niche: "Casa",
      rating: 4.8,
      sales: "Minerador",
      score: 92,
      store: "Marketplace",
      status: "Ativo",
      image: "manual-item",
      affiliate_link: offerLink
    })
    .select("*")
    .single()

  if (offerError) {
    return errorResponse(offerError.message)
  }

  const { data: groups, error: groupsError } = await supabase
    .from("groups")
    .select("id, name, niche, status")

  if (groupsError) {
    return errorResponse(groupsError.message)
  }

  const selectedGroups = ((groups ?? []) as GroupRow[])
    .filter(isValidGroup)
    .map((group) => ({
      id: group.id,
      name: group.name,
      niche: group.niche,
      status: group.status
    }))

  const message = `🔥 Oferta minerada pelo Bot\n\n${offerTitle}\nPor apenas R$ 79,90\nEconomia de R$ 50,00\n\nComprar agora:\n${offerLink}`

  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .insert({
      mining_run_id: miningRun.id,
      offer_id: offer.id,
      name: "Campanha automática - Kit Organização Casa",
      offer_title: offerTitle,
      niche: "Casa",
      message,
      message_model: "Modelo automático 01",
      selected_groups: selectedGroups,
      source: "bot",
      status: "Aguardando aprovação"
    })
    .select("*")
    .single()

  if (campaignError) {
    return errorResponse(campaignError.message)
  }

  return NextResponse.json({
    success: true,
    sucesso: true,
    mining_run: miningRun,
    offer,
    campaign
  })
}
