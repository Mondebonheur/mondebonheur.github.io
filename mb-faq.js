/**
 * mb-faq.js — FAQs contextuelles par page
 * ONG Monde et Bonheur — 2026
 *
 * Usage : <script src="mb-faq.js"></script>
 * Ajouter dans la page : <div id="mb-faq-inject"></div>
 * Le composant détecte automatiquement la page et injecte les bonnes FAQs.
 *
 * On peut aussi forcer une page : <div id="mb-faq-inject" data-page="don"></div>
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     CSS DU COMPOSANT FAQ
  ══════════════════════════════════════════════════ */
  if (!document.getElementById('mb-faq-style')) {
    const style = document.createElement('style');
    style.id = 'mb-faq-style';
    style.textContent = `
      .mb-faq-section {
        padding: 70px 8%; background: var(--gr, #f0ede6);
      }
      .mb-faq-section.on-white { background: white; }
      .mb-faq-section.on-dark {
        background: linear-gradient(135deg, #0d1f14, #162218);
      }
      .mb-faq-inner { max-width: 800px; margin: 0 auto; }
      .mb-faq-header { text-align: center; margin-bottom: 2.5rem; }
      .mb-faq-lbl {
        font-family: 'Space Mono', monospace; font-size: 10px;
        letter-spacing: .15em; color: #c8860a; text-transform: uppercase;
        margin-bottom: .6rem;
      }
      .mb-faq-title {
        font-family: 'Playfair Display', serif;
        font-size: clamp(1.8rem, 3vw, 2.3rem); font-weight: 700;
        color: #1a1a18; line-height: 1.2; margin-bottom: .5rem;
      }
      .mb-faq-section.on-dark .mb-faq-title { color: white; }
      .mb-faq-subtitle { font-size: 15px; color: #4a4a44; line-height: 1.7; }
      .mb-faq-section.on-dark .mb-faq-subtitle { color: rgba(255,255,255,.6); }
      .mb-faq-item {
        border-bottom: 1px solid rgba(26,92,58,.1);
      }
      .mb-faq-section.on-dark .mb-faq-item {
        border-bottom-color: rgba(255,255,255,.08);
      }
      .mb-faq-q {
        width: 100%; background: none; border: none; cursor: pointer;
        display: flex; justify-content: space-between; align-items: center;
        padding: 1.1rem 0; text-align: left;
        font-family: 'DM Sans', sans-serif;
      }
      .mb-faq-q-txt {
        font-size: 15px; font-weight: 600; color: #1a1a18;
        padding-right: 1rem; line-height: 1.35;
      }
      .mb-faq-section.on-dark .mb-faq-q-txt { color: white; }
      .mb-faq-ico {
        width: 28px; height: 28px; border-radius: 50%;
        background: #e8f5ee; display: flex; align-items: center;
        justify-content: center; color: #1a5c3a; font-size: 18px;
        flex-shrink: 0; transition: transform .3s, background .2s;
      }
      .mb-faq-section.on-dark .mb-faq-ico {
        background: rgba(45,138,88,.2); color: #86d0a0;
      }
      .mb-faq-item.open .mb-faq-ico {
        transform: rotate(45deg); background: #1a5c3a; color: white;
      }
      .mb-faq-ans {
        max-height: 0; overflow: hidden;
        transition: max-height .4s ease, padding .3s;
        font-size: 14px; color: #4a4a44; line-height: 1.8;
      }
      .mb-faq-section.on-dark .mb-faq-ans { color: rgba(255,255,255,.65); }
      .mb-faq-item.open .mb-faq-ans { max-height: 400px; padding-bottom: 1.2rem; }
      .mb-faq-cta {
        display: flex; justify-content: center; margin-top: 2rem;
      }
      .mb-faq-cta a {
        display: inline-flex; align-items: center; gap: .5rem;
        font-size: 14px; font-weight: 600; color: #1a5c3a;
        text-decoration: none; padding: 10px 22px;
        border: 1.5px solid rgba(26,92,58,.2); border-radius: 9px;
        background: white; transition: all .2s;
        font-family: 'DM Sans', sans-serif;
      }
      .mb-faq-cta a:hover {
        background: #e8f5ee; transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════════════
     DONNÉES FAQ PAR PAGE
  ══════════════════════════════════════════════════ */
  const FAQS = {

    /* ── PAGE D'ACCUEIL ── */
    'index.html': {
      titleFR: 'Questions fréquentes',
      titleEN: 'Frequently asked questions',
      subFR: "Tout ce qu'il faut savoir sur Monde et Bonheur en quelques réponses.",
      subEN: "Everything you need to know about Monde et Bonheur in a few answers.",
      items: [
        {
          qFR: "Qu'est-ce que Monde et Bonheur exactement ?",
          qEN: "What exactly is Monde et Bonheur?",
          aFR: "Monde et Bonheur est une Organisation Hybride : à la fois Association de Solidarité Internationale (Loi 1901, fondée en France en 2005) et ONG agréée au Cameroun (MINATD N°00000404, 2006). Nous combinons la mission sociale d'une ONG classique avec l'innovation technologique d'une entreprise sociale. Notre spécialité : des technologies frugales pour l'autonomie rurale en Afrique (cuisinières écologiques, séchoir flash, biométhanisation, MetaScript).",
          aEN: "Monde et Bonheur is a Hybrid Organisation: both an International Solidarity Association (French Law 1901, founded 2005) and an accredited NGO in Cameroon (MINATD N°00000404, 2006). We combine the social mission of a classic NGO with the technological innovation of a social enterprise. Our speciality: frugal technologies for rural autonomy in Africa (eco-cookers, flash dryer, biodigestion, MetaScript)."
        },
        {
          qFR: "Où exactement travaillez-vous sur le terrain ?",
          qEN: "Where exactly do you work in the field?",
          aFR: "Nous intervenons dans 5 zones au Cameroun : Batchenga (Région du Centre — coopérative CUMA féminine), Bondjock (Nyong-et-Kéllé — lycée et méthaniseur pilote), Lomié/Abakoum (Région de l'Est — école des Pygmées Baka), Kribi (Région du Sud — écotourisme et pêche durable) et Yaoundé (siège opérationnel). D'ici 2030, nous visons 7 pays panafricains.",
          aEN: "We work in 5 zones in Cameroon: Batchenga (Central Region — women's CUMA cooperative), Bondjock (Nyong-et-Kéllé — high school and pilot digester), Lomié/Abakoum (Eastern Region — Baka Pygmies school), Kribi (Southern Region — eco-tourism and sustainable fishing) and Yaoundé (operational headquarters). By 2030, we target 7 pan-African countries."
        },
        {
          qFR: "Comment puis-je vous aider concrètement ?",
          qEN: "How can I concretely help?",
          aFR: "Il y a 4 façons : (1) Faire un don ciblé — 30€ finance une cuisinière, 50€ parraine un enfant un mois, 250€ installe un digesteur. (2) Devenir partenaire — entreprises (RSE/carbone), banques (crédit productif), institutions (ODD). (3) Rejoindre l'équipe — bénévolat de compétences, stage terrain. (4) Partager notre mission — parlez de nous autour de vous, sur vos réseaux.",
          aEN: "There are 4 ways: (1) Make a targeted donation — €30 funds a cooker, €50 sponsors a child for a month, €250 installs a digester. (2) Become a partner — companies (CSR/carbon), banks (productive credit), institutions (SDGs). (3) Join the team — skills volunteering, field internship. (4) Share our mission — talk about us around you, on your networks."
        },
        {
          qFR: "Monde et Bonheur est-elle une ONG sérieuse et transparente ?",
          qEN: "Is Monde et Bonheur a serious and transparent NGO?",
          aFR: "Oui. Nous avons 3 accréditations officielles : MINATD (Cameroun, 2006), MINREX (Répertoire officiel des ONG) et le label FORIM (France). 96% de nos fonds vont directement sur le terrain. Nos comptes sont audités annuellement par un commissaire aux comptes indépendant. Chaque donateur reçoit un rapport d'impact photographié dans les 60 jours.",
          aEN: "Yes. We have 3 official accreditations: MINATD (Cameroon, 2006), MINREX (Official NGO Registry) and the FORIM label (France). 96% of our funds go directly to the field. Our accounts are audited annually by an independent accountant. Every donor receives a photographed impact report within 60 days."
        }
      ],
      ctaFR: "Voir toutes nos FAQs", ctaEN: "See all our FAQs", ctaHref: 'actualites.html'
    },

    /* ── PAGE DON ── */
    'don.html': {
      titleFR: 'Vos questions sur les dons',
      titleEN: 'Your donation questions',
      subFR: "Transparence totale sur ce que devient votre argent.",
      subEN: "Total transparency on what happens to your money.",
      items: [
        {
          qFR: "Mon don est-il déductible des impôts ?",
          qEN: "Is my donation tax-deductible?",
          aFR: "Oui, pour les donateurs résidant en France. Les dons aux associations reconnues d'intérêt général ouvrent droit à une réduction d'impôt de 66% du montant versé (dans la limite de 20% du revenu imposable). Exemple : un don de 100€ vous coûte réellement 34€. Un reçu fiscal (Cerfa 11580*03) vous est envoyé automatiquement par email dans les 24h.",
          aEN: "Yes, for donors residing in France. Donations to recognised public-interest associations qualify for a 66% tax reduction on the amount donated (up to 20% of taxable income). Example: a €100 donation actually costs you €34. A tax receipt is automatically emailed to you within 24 hours."
        },
        {
          qFR: "Comment puis-je être certain que mon argent arrive bien sur le terrain ?",
          qEN: "How can I be sure my money actually reaches the field?",
          aFR: "Trois garanties : (1) 96% de nos fonds sont affectés directement aux projets terrain — les 4% restants couvrent uniquement la coordination administrative. (2) Vous recevez un rapport d'impact nominatif avec photos dans les 60 jours. (3) Nos comptes sont audités annuellement par un commissaire aux comptes indépendant. Nos accréditations MINATD, MINREX et FORIM garantissent notre transparence.",
          aEN: "Three guarantees: (1) 96% of our funds are allocated directly to field projects — the remaining 4% covers administrative coordination only. (2) You receive a named impact report with photos within 60 days. (3) Our accounts are audited annually by an independent accountant. Our MINATD, MINREX and FORIM accreditations guarantee our transparency."
        },
        {
          qFR: "Puis-je faire un don depuis l'Afrique (Cameroun, Nigéria…) ?",
          qEN: "Can I donate from Africa (Cameroon, Nigeria…)?",
          aFR: "Oui. Nous acceptons les paiements Mobile Money (MTN Mobile Money, Orange Money), les virements bancaires locaux en FCFA, et les chèques. Contactez-nous directement par WhatsApp au +237 682 18 03 63 et nous vous guidons selon votre pays et votre méthode de paiement préférée.",
          aEN: "Yes. We accept Mobile Money payments (MTN Mobile Money, Orange Money), local bank transfers in FCFA, and cheques. Contact us directly via WhatsApp at +237 682 18 03 63 and we'll guide you based on your country and preferred payment method."
        },
        {
          qFR: "Puis-je annuler mon don mensuel ?",
          qEN: "Can I cancel my monthly donation?",
          aFR: "Oui, à tout moment, sans justification et sans frais. Envoyez-nous un email à courrielmondeetbonheur@gmail.com ou un message WhatsApp avec la mention 'Annulation prélèvement mensuel' et votre email. Nous traitons toutes les demandes sous 24h ouvrées.",
          aEN: "Yes, at any time, without explanation and without fees. Send us an email to courrielmondeetbonheur@gmail.com or a WhatsApp message noting 'Cancel monthly direct debit' and your email. We process all requests within 24 business hours."
        },
        {
          qFR: "Mon entreprise veut faire un don important. Y a-t-il un cadre spécifique ?",
          qEN: "My company wants to make a significant donation. Is there a specific framework?",
          aFR: "Oui — c'est ce qu'on appelle le mécénat d'entreprise. Nous établissons une convention de mécénat qui précise l'affectation exacte, le calendrier, et les livrables (rapport d'impact, Certificat Carbone auditable, visibilité RSE). Le mécénat est déductible à 60% de l'impôt sur les sociétés (dans la limite de 0,5% du CA). Contactez-nous pour un rendez-vous sous 48h.",
          aEN: "Yes — this is corporate sponsorship (mécénat). We establish a sponsorship agreement specifying the exact allocation, timeline, and deliverables (impact report, auditable Carbon Certificate, CSR visibility). Corporate sponsorship is 60% deductible from corporation tax (up to 0.5% of turnover). Contact us for a meeting within 48h."
        }
      ],
      ctaFR: "Voir la page Partenaires", ctaEN: "See the Partners page", ctaHref: 'partenaires.html'
    },

    /* ── PAGE TECHNOLOGIES ── */
    'technologies.html': {
      titleFR: 'Questions techniques fréquentes',
      titleEN: 'Frequently asked technical questions',
      subFR: "Comment nos technologies fonctionnent, combien elles coûtent, et comment les obtenir.",
      subEN: "How our technologies work, what they cost, and how to obtain them.",
      items: [
        {
          qFR: "Où puis-je acheter une cuisinière 'I Bois / 3 Foyers' ?",
          qEN: "Where can I buy a '1 Wood / 3 Fires' cooker?",
          aFR: "Les cuisinières MB sont disponibles directement auprès de nos coordinateurs terrain au Cameroun. Elles peuvent être financées via un don (30€ sur don.html) pour être distribuées gratuitement à une famille bénéficiaire, ou achetées directement pour les entreprises souhaitant les distribuer dans le cadre de leur RSE. Contactez-nous à courrielmondeetbonheur@gmail.com pour les prix et modalités.",
          aEN: "MB cookers are available directly from our field coordinators in Cameroon. They can be funded via a donation (€30 on don.html) to be distributed free to a beneficiary family, or purchased directly by companies wishing to distribute them as part of their CSR. Contact us at courrielmondeetbonheur@gmail.com for prices and terms."
        },
        {
          qFR: "Le Séchoir Flash fonctionne-t-il avec d'autres produits que le poisson ?",
          qEN: "Does the Flash Dryer work with products other than fish?",
          aFR: "Oui. Le Séchoir Flash MB a été testé avec succès sur : poisson fumé, cacao, fèves de café, manioc, plantain, piments, tomates, gingembre, et champignons. La technologie de ventilation cyclonique s'adapte à tout produit humide nécessitant une déshydratation rapide. Le réglage de la température et du débit d'air varie selon le produit.",
          aEN: "Yes. The MB Flash Dryer has been successfully tested on: smoked fish, cocoa, coffee beans, cassava, plantain, peppers, tomatoes, ginger, and mushrooms. The cyclonic ventilation technology adapts to any moist product requiring rapid dehydration. Temperature and airflow settings vary by product."
        },
        {
          qFR: "MetaScript nécessite-t-il une connexion Internet permanente ?",
          qEN: "Does MetaScript require a permanent Internet connection?",
          aFR: "Non — c'est l'une de ses forces majeures. MetaScript fonctionne entièrement en mode hors-ligne (offline-first). Une connexion Internet est nécessaire uniquement pour la mise à jour initiale du logiciel et le téléchargement de nouveaux modules. Ensuite, l'application tourne complètement sans Internet, sur des tablettes Android à partir de 50 000 FCFA.",
          aEN: "No — this is one of its major strengths. MetaScript works entirely in offline mode (offline-first). An Internet connection is only needed for the initial software update and downloading new modules. Afterwards, the application runs completely without Internet, on Android tablets from 50,000 FCFA."
        },
        {
          qFR: "Comment un digesteur biogaz est-il entretenu ?",
          qEN: "How is a biogas digester maintained?",
          aFR: "Nos digesteurs sont conçus pour une maintenance minimale. L'entretien de base consiste à : alimenter quotidiennement le digesteur en déchets organiques (ratio eau/matières recommandé), vérifier mensuellement l'étanchéité de la cuve, et nettoyer le filtre à eau tous les 3 mois. Chaque installation inclut une formation de 3 jours pour la famille ou la coopérative bénéficiaire. Un technicien MB est disponible par téléphone pour tout problème.",
          aEN: "Our digesters are designed for minimal maintenance. Basic maintenance involves: daily feeding of the digester with organic waste (recommended water/material ratio), monthly checking of tank tightness, and cleaning the water filter every 3 months. Each installation includes a 3-day training for the beneficiary family or cooperative. An MB technician is available by phone for any problem."
        }
      ],
      ctaFR: "Nous contacter pour un devis", ctaEN: "Contact us for a quote", ctaHref: 'partenaires.html'
    },

    /* ── PAGE PARTENAIRES ── */
    'partenaires.html': {
      titleFR: 'Vos questions sur les partenariats',
      titleEN: 'Your partnership questions',
      subFR: "Tout ce que vous devez savoir avant de nous contacter.",
      subEN: "Everything you need to know before contacting us.",
      items: [
        {
          qFR: "Quel est le montant minimum pour un partenariat d'entreprise ?",
          qEN: "What is the minimum amount for a corporate partnership?",
          aFR: "Notre Pack Éco-Responsable commence à 5 000€ — ce qui finance 50 cuisinières écologiques et génère 250 tonnes de CO₂ évitées, certifiées. En dessous de ce montant, nous orientons vers un don direct (page Don). Pour les grandes entreprises, nos packs montent jusqu'à 100 000€+ avec naming d'unité de production, siège au Comité Stratégique et reportage documentaire terrain.",
          aEN: "Our Eco-Responsible Pack starts at €5,000 — funding 50 eco-cookers and generating 250 certified tonnes of CO₂ avoided. Below this amount, we direct towards a direct donation (Donate page). For large companies, our packs go up to €100,000+ with production unit naming, seat on the Strategic Committee and field documentary."
        },
        {
          qFR: "Comment fonctionne le Certificat Carbone que vous proposez ?",
          qEN: "How does the Carbon Certificate you offer work?",
          aFR: "Chaque cuisinière MB économise 5 tonnes de bois/an, soit environ 2,5 tonnes de CO₂ par an. Nous calculons l'empreinte carbone évitée selon la méthodologie Gold Standard simplifiée, et nous vous délivrons un Certificat d'Impact Carbone nominatif et auditable. Ce document est utilisable dans votre bilan GES (Grenelle II), votre rapport RSE et votre communication développement durable.",
          aEN: "Each MB cooker saves 5 tonnes of wood/year, approximately 2.5 tonnes of CO₂ per year. We calculate the avoided carbon footprint using a simplified Gold Standard methodology, and issue you a named, auditable Carbon Impact Certificate. This document can be used in your GHG report, CSR report and sustainability communications."
        },
        {
          qFR: "Combien de temps faut-il entre la signature et les premiers résultats terrain ?",
          qEN: "How long between signing and first field results?",
          aFR: "Notre processus est : Semaine 1 → Convention signée + virement. Semaines 2-4 → Approvisionnement matériel et sélection bénéficiaires. Mois 2 → Installation terrain et formation. Mois 2-3 → Photos de livraison et premier rapport intermédiaire. Mois 3 → Rapport d'impact complet avec chiffres mesurés. Pour les projets complexes (méthaniseur, séchoir), comptez 3 à 6 mois.",
          aEN: "Our process is: Week 1 → Agreement signed + transfer. Weeks 2-4 → Material procurement and beneficiary selection. Month 2 → Field installation and training. Months 2-3 → Delivery photos and first interim report. Month 3 → Full impact report with measured figures. For complex projects (digester, dryer), allow 3 to 6 months."
        },
        {
          qFR: "Les banques et microfinances peuvent-elles financer nos équipements plutôt que de faire un don ?",
          qEN: "Can banks and microfinance organisations finance our equipment rather than donate?",
          aFR: "Oui — c'est même notre modèle privilégié pour les institutions financières. Nos équipements (cuisinière, séchoir, digesteur) sont des actifs productifs qui génèrent du cash-flow immédiat pour les emprunteurs. Nous proposons un modèle 'Pay-as-you-save' où les remboursements sont couverts par les économies réalisées. MB assure la formation technique qui sécurise le remboursement.",
          aEN: "Yes — this is actually our preferred model for financial institutions. Our equipment (cooker, dryer, digester) are productive assets that generate immediate cash-flow for borrowers. We offer a 'Pay-as-you-save' model where repayments are covered by savings made. MB provides technical training that secures repayment."
        }
      ],
      ctaFR: "Prendre rendez-vous maintenant", ctaEN: "Book a meeting now", ctaHref: '#contact-rdv'
    },

    /* ── PAGE GOUVERNANCE ── */
    'gouvernance.html': {
      titleFR: 'Questions sur notre gouvernance',
      titleEN: 'Questions about our governance',
      subFR: "Transparence totale sur notre fonctionnement interne.",
      subEN: "Full transparency on our internal operations.",
      items: [
        {
          qFR: "Comment puis-je obtenir vos rapports d'activité complets ?",
          qEN: "How can I obtain your complete activity reports?",
          aFR: "Tous nos rapports d'activité (Triennale 2006-09, Biennal 2013-14, Annuel 2022) sont disponibles sur demande. Envoyez-nous un email à courrielmondeetbonheur@gmail.com avec la mention 'Demande rapport d'activité [année]'. Nous vous envoyons le document en PDF sous 48h. Ces rapports incluent la liste complète des projets, les bénéficiaires touchés, et la répartition détaillée des dépenses.",
          aEN: "All our activity reports (Triennial 2006-09, Biennial 2013-14, Annual 2022) are available on request. Send us an email to courrielmondeetbonheur@gmail.com noting 'Activity report request [year]'. We send you the PDF document within 48h. These reports include the complete project list, beneficiaries reached, and detailed expenditure breakdown."
        },
        {
          qFR: "Qui audite vos comptes et comment garantissez-vous l'indépendance de l'audit ?",
          qEN: "Who audits your accounts and how do you guarantee audit independence?",
          aFR: "Nos comptes sont audités annuellement par un commissaire aux comptes indépendant et agréé, extérieur à toute structure liée à MB. L'auditeur est mandaté par le Conseil d'Administration (pas par la direction) pour garantir son indépendance. Les conclusions de l'audit sont communiquées intégralement à l'Assemblée Générale et disponibles pour nos partenaires financeurs.",
          aEN: "Our accounts are audited annually by an independent, certified accountant, external to any structure linked to MB. The auditor is mandated by the Board of Directors (not by management) to guarantee independence. Audit findings are communicated in full to the General Assembly and available to our financial partners."
        },
        {
          qFR: "Que signifie '96% des fonds sur le terrain' exactement ?",
          qEN: "What does '96% of funds to the field' exactly mean?",
          aFR: "Cela signifie que sur 100€ reçus, 96€ sont affectés directement aux projets terrain (achat matériel, formation, transport local, coordination locale). Les 4% restants couvrent exclusivement les frais de fonctionnement incompressibles : frais bancaires, assurances, communications essentielles, et la petite partie des déplacements de coordination internationale. Aucun euro de vos dons ne sert à des salaires administratifs.",
          aEN: "This means that for every €100 received, €96 is allocated directly to field projects (equipment purchase, training, local transport, local coordination). The remaining 4% covers only unavoidable operating costs: bank charges, insurance, essential communications, and a small portion of international coordination travel. None of your donation goes to administrative salaries."
        }
      ],
      ctaFR: "Demander les documents officiels", ctaEN: "Request official documents",
      ctaHref: 'mailto:courrielmondeetbonheur@gmail.com?subject=Demande documents gouvernance'
    },

    /* ── PAGE CARTE ── */
    'carte.html': {
      titleFR: 'Questions sur nos zones d\'intervention',
      titleEN: 'Questions about our intervention zones',
      subFR: "Comprendre notre présence terrain au Cameroun et en Afrique.",
      subEN: "Understanding our field presence in Cameroon and Africa.",
      items: [
        {
          qFR: "Peut-on visiter vos projets sur le terrain ?",
          qEN: "Can we visit your field projects?",
          aFR: "Oui — nous organisons des visites terrain pour nos partenaires, journalistes, institutions et grands donateurs. Les visites incluent Batchenga (CUMA féminine, séchoir Flash), Bondjock (lycée, méthaniseur pilote) et Lomié (école Baka). La durée typique est de 3 à 5 jours. Logement facilité. Contactez-nous au moins 4 semaines à l'avance pour planifier votre visite.",
          aEN: "Yes — we organise field visits for our partners, journalists, institutions and major donors. Visits include Batchenga (women's CUMA, Flash Dryer), Bondjock (high school, pilot digester) and Lomié (Baka school). Typical duration is 3 to 5 days. Accommodation facilitated. Contact us at least 4 weeks in advance to plan your visit."
        },
        {
          qFR: "Pourquoi intervenez-vous spécifiquement auprès des Pygmées Baka ?",
          qEN: "Why do you specifically work with the Baka Pygmies?",
          aFR: "Les Pygmées Baka sont l'une des communautés les plus marginalisées du Cameroun — taux d'alphabétisation quasi nul, accès aux soins inexistant, sédentarisation forcée mal accompagnée. Notre intervention à Lomié/Abakoum repose sur un principe fondamental : respecter totalement leur culture tout en leur offrant des outils (école, nutrition) qui leur permettent de choisir leur propre avenir. Notre coordinateur Samuel B. est lui-même médiateur culturel parlant les dialectes locaux.",
          aEN: "Baka Pygmies are one of Cameroon's most marginalised communities — near-zero literacy, no access to healthcare, poorly accompanied forced settlement. Our intervention in Lomié/Abakoum rests on a fundamental principle: fully respecting their culture while offering tools (school, nutrition) that allow them to choose their own future. Our coordinator Samuel B. is himself a cultural mediator speaking local dialects."
        },
        {
          qFR: "Comment choisissez-vous les pays de votre expansion panafricaine ?",
          qEN: "How do you choose the countries for your pan-African expansion?",
          aFR: "Nos critères de sélection sont : (1) Problèmes identiques à ceux résolus au Cameroun (déforestation, pluies imprévisibles, manque d'électricité rurale). (2) Existence d'une diaspora partenaire active en Europe. (3) Gouvernement favorable aux projets d'énergies propres rurales. (4) Partenaire local solide et fiable identifié. Nous ne 'parachutions' jamais — nous transférons notre modèle documenté avec des alliés locaux.",
          aEN: "Our selection criteria are: (1) Identical problems to those solved in Cameroon (deforestation, unpredictable rainfall, lack of rural electricity). (2) Existence of an active partner diaspora in Europe. (3) Government favourable to rural clean energy projects. (4) Solid and reliable local partner identified. We never 'parachute' — we transfer our documented model with local allies."
        }
      ],
      ctaFR: "Organiser une visite terrain", ctaEN: "Organise a field visit",
      ctaHref: 'mailto:courrielmondeetbonheur@gmail.com?subject=Demande visite terrain'
    },

    /* ── PAGE ACTUALITÉS ── */
    'actualites.html': {
      titleFR: 'Questions sur nos actualités',
      titleEN: 'Questions about our news',
      subFR: "S'abonner, contribuer, partager.",
      subEN: "Subscribe, contribute, share.",
      items: [
        {
          qFR: "À quelle fréquence publiez-vous des actualités ?",
          qEN: "How often do you publish news?",
          aFR: "Nous publions des actualités terrain dès qu'un événement significatif se produit — en général 1 à 3 articles par mois. La newsletter mensuelle résume les temps forts du mois avec photos et chiffres clés. Nous couvrons : installations d'équipements, résultats scolaires, témoignages terrain, revue de presse, et annonces d'événements.",
          aEN: "We publish field news as soon as a significant event occurs — generally 1 to 3 articles per month. The monthly newsletter summarises the month's highlights with photos and key figures. We cover: equipment installations, school results, field testimonials, press reviews, and event announcements."
        },
        {
          qFR: "Comment puis-je m'inscrire à votre newsletter ?",
          qEN: "How can I subscribe to your newsletter?",
          aFR: "Utilisez le formulaire d'inscription en bas de cette page. Maximum 1 email par mois. Contenu : photos terrain, chiffres d'impact, événements à venir. Désinscription en 1 clic à tout moment. Vos données ne sont jamais revendues. Pour les partenaires, nous proposons aussi une lettre d'information trimestrielle plus détaillée.",
          aEN: "Use the subscription form at the bottom of this page. Maximum 1 email per month. Content: field photos, impact figures, upcoming events. Unsubscribe in 1 click at any time. Your data is never resold. For partners, we also offer a more detailed quarterly newsletter."
        },
        {
          qFR: "Je suis journaliste. Comment obtenir des informations ou organiser un reportage ?",
          qEN: "I'm a journalist. How to get information or organise a feature?",
          aFR: "Nous accueillons avec plaisir les journalistes souhaitant couvrir nos projets. Envoyez votre demande d'accréditation presse à courrielmondeetbonheur@gmail.com avec le nom de votre média, l'angle envisagé et les dates souhaitées. Nous pouvons organiser des visites terrain au Cameroun, des interviews de la présidente Hermine Ngo Batjom, et des démonstrations live des technologies.",
          aEN: "We warmly welcome journalists wishing to cover our projects. Send your press accreditation request to courrielmondeetbonheur@gmail.com with your media name, proposed angle and desired dates. We can organise field visits in Cameroon, interviews with President Hermine Ngo Batjom, and live technology demonstrations."
        }
      ],
      ctaFR: "S'abonner à la newsletter", ctaEN: "Subscribe to newsletter",
      ctaHref: '#newsletter'
    },

    /* ── PAGE ÉQUIPE ── */
    'equipe.html': {
      titleFR: 'Vous avez des questions sur notre équipe ?',
      titleEN: 'Questions about our team?',
      subFR: "Rejoindre, collaborer, stagier.",
      subEN: "Join, collaborate, intern.",
      items: [
        {
          qFR: "Comment rejoindre l'équipe de Monde et Bonheur ?",
          qEN: "How to join the Monde et Bonheur team?",
          aFR: "Nous accueillons les bénévoles de compétences (ingénieurs, médecins, développeurs, formateurs, juristes) à distance ou sur le terrain. Envoyez votre CV et domaines d'expertise à courrielmondeetbonheur@gmail.com en précisant 'Candidature Bénévolat'. Réponse garantie sous 48h.",
          aEN: "We welcome skills volunteers (engineers, doctors, developers, trainers, lawyers) remotely or in the field. Send your CV and areas of expertise to courrielmondeetbonheur@gmail.com noting 'Volunteering Application'. Reply guaranteed within 48h."
        },
        {
          qFR: "Peut-on faire un stage avec MB au Cameroun ?",
          qEN: "Can I do an internship with MB in Cameroon?",
          aFR: "Oui. Nous accueillons des stagiaires (minimum 3 mois) dans nos zones d'intervention : Batchenga, Bondjock, Lomié. Missions possibles : technique (biogaz, MetaScript), sociale (animation, formation femmes) ou administrative. Logement facilité sur place. Envoyez votre dossier de candidature avec CV, lettre de motivation et période souhaitée.",
          aEN: "Yes. We welcome interns (minimum 3 months) in our intervention zones: Batchenga, Bondjock, Lomié. Possible missions: technical (biogas, MetaScript), social (activities, women's training) or administrative. Accommodation facilitated on-site. Send your application with CV, cover letter and desired period."
        }
      ],
      ctaFR: "Nous écrire", ctaEN: "Write to us",
      ctaHref: 'mailto:courrielmondeetbonheur@gmail.com?subject=Candidature Bénévolat MB'
    }
  };

  /* ══════════════════════════════════════════════════
     MOTEUR D'INJECTION
  ══════════════════════════════════════════════════ */
  function getLang() {
    return document.documentElement.getAttribute('data-lang') || 'fr';
  }

  function currentPage() {
    const p = window.location.pathname.split('/').pop() || 'index.html';
    return p === '' ? 'index.html' : p;
  }

  function toggleFaqItem(btn) {
    const item = btn.closest('.mb-faq-item');
    const open = item.classList.contains('open');
    item.closest('.mb-faq-inner').querySelectorAll('.mb-faq-item.open')
      .forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  }

  function buildFaq(pageKey, theme) {
    const data = FAQS[pageKey];
    if (!data) return '';
    const l = getLang();
    const title = l === 'fr' ? data.titleFR : data.titleEN;
    const sub   = l === 'fr' ? data.subFR   : data.subEN;
    const cta   = l === 'fr' ? data.ctaFR   : data.ctaEN;
    const themeClass = theme === 'white' ? 'on-white' : theme === 'dark' ? 'on-dark' : '';

    const items = data.items.map((item, idx) => {
      const q = l === 'fr' ? item.qFR : item.qEN;
      const a = l === 'fr' ? item.aFR : item.aEN;
      return `
        <div class="mb-faq-item">
          <button class="mb-faq-q" onclick="MBFaq.toggle(this)" aria-expanded="false">
            <span class="mb-faq-q-txt">${q}</span>
            <span class="mb-faq-ico" aria-hidden="true">+</span>
          </button>
          <div class="mb-faq-ans" role="region">${a}</div>
        </div>`;
    }).join('');

    const ctaHTML = data.ctaHref ? `
      <div class="mb-faq-cta">
        <a href="${data.ctaHref}">${cta} →</a>
      </div>` : '';

    return `
      <section class="mb-faq-section ${themeClass}" id="mb-faq-section">
        <div class="mb-faq-inner">
          <div class="mb-faq-header">
            <div class="mb-faq-lbl">FAQ</div>
            <h2 class="mb-faq-title">${title}</h2>
            <p class="mb-faq-subtitle">${sub}</p>
          </div>
          ${items}
          ${ctaHTML}
        </div>
      </section>`;
  }

  function inject() {
    const targets = document.querySelectorAll('[id="mb-faq-inject"], [data-mb-faq]');
    targets.forEach(target => {
      const forcedPage = target.getAttribute('data-page') || null;
      const theme      = target.getAttribute('data-theme') || '';
      const pageKey    = forcedPage || currentPage();
      if (!FAQS[pageKey]) return;
      const html = buildFaq(pageKey, theme);
      target.outerHTML = html;
    });

    // Auto-inject si aucun target mais page connue
    if (!document.querySelector('#mb-faq-section') && !document.querySelector('[data-mb-faq]')) {
      const pageKey = currentPage();
      if (FAQS[pageKey]) {
        // Chercher le footer ou la CTA finale pour insérer avant
        const before = document.getElementById('mb-footer') ||
                       document.querySelector('.cta-finale') ||
                       document.querySelector('footer');
        if (before) {
          const div = document.createElement('div');
          div.innerHTML = buildFaq(pageKey, '');
          before.parentNode.insertBefore(div.firstElementChild, before);
        }
      }
    }
  }

  /* ══════════════════════════════════════════════════
     API PUBLIQUE
  ══════════════════════════════════════════════════ */
  window.MBFaq = {
    toggle: function(btn) {
      const item = btn.closest('.mb-faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.mb-faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) { item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
      else { btn.setAttribute('aria-expanded','false'); }
    },
    inject,
    rebuild: function() {
      document.querySelectorAll('#mb-faq-section').forEach(el => el.remove());
      inject();
    }
  };

  /* Auto-injection au chargement */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
