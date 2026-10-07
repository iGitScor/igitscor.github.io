---
title: MCP, au-delà des outils
description: À quoi servent l’élicitation, le sampling et les complétions, d’après la construction d’un serveur KYB qui utilise toutes les primitives MCP.
date: 2026-10-07
draft: true
project: kyb-mcp
---
La plupart des serveurs Model Context Protocol n’exposent que des outils. kyb-mcp, un atelier qui interroge le registre français des entreprises et tient des dossiers KYB, a été conçu pour utiliser toutes les primitives, à dessein. Les outils et les ressources sont bien documentés. Ces trois-là le sont moins, et chacune résout un vrai problème.

## L’élicitation : demander à l’humain, pas au modèle

Archiver un dossier est destructif. Une annotation peut marquer l’outil comme tel, mais c’est toujours le modèle qui décide de l’appeler. Avec l’élicitation, le serveur interroge directement l’utilisateur, dans son client, avec un formulaire typé. L’outil `archive_dossier` gère trois réponses : accepter, refuser et annuler. Seule une confirmation explicite change quelque chose.

Tout tient à qui répond. Une confirmation qui passe par le modèle peut être hallucinée ou obtenue par persuasion ; celle qui vient de l’interface du client, non.

## Le sampling : emprunter le modèle du client

`draft_risk_summary` rédige un premier jet de synthèse des risques d’une entreprise. Le serveur n’a ni modèle ni clé d’API. Grâce au sampling, il demande au modèle du client d’écrire le texte, puis l’enregistre comme une note marquée `ai_summary` : un point de départ pour l’analyste, jamais une décision.

Deux limites à connaître. Le sampling ne fonctionne que si le client déclare cette capacité ; sinon l’outil échoue proprement, avec une erreur claire. Et la prise en charge varie d’un client à l’autre : l’inspecteur MCP m’a servi de client de référence.

## Les complétions : l’autocomplétion des arguments

Les prompts et les modèles de ressources prennent des arguments, et le SIREN d’une entreprise est un nombre à neuf chiffres dont personne ne se souvient. Le gestionnaire de complétion propose, au fil de la saisie, les SIREN des entreprises vues récemment par le serveur. Une petite fonctionnalité qui rend les prompts utilisables par des personnes, et pas seulement par des modèles.

## Ce qui a changé en 2026

Depuis la révision du protocole du 28 juillet 2026, le serveur n’envoie plus de requêtes au client. Un outil qui a besoin de l’utilisateur ou du modèle du client renvoie un résultat « saisie requise » ; le client répond et rappelle l’outil. Le SDK Python v2 cache ce mécanisme derrière des paramètres de dépendance qui renvoient un `Elicit` ou un `Sample`.

Cela a une conséquence pour l’hébergement. En HTTP sans état, le second appel peut arriver sur une autre instance : l’état d’un appel en plusieurs étapes est donc scellé avec une clé que toutes les instances doivent partager. Oubliez-la, et l’élicitation fonctionne sur votre portable mais échoue en production.

## À retenir

- L’élicitation sert au consentement et aux actions destructives : c’est l’humain qui répond, pas le modèle.
- Le sampling sert quand le serveur a besoin de langage mais ne doit ni détenir de clé ni payer un modèle.
- Ajoutez des complétions partout où une personne saisit un identifiant.
- La plupart des tutoriels montrent encore le SDK d’avant 2026. Lisez la référence du SDK, pas les billets de blog.
