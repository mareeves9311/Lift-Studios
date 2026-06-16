#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

GOOGLE_SUITE = Path("/Users/meganreeves/Desktop/Desktop Organized/Scripts & Tools/shared_integrations/google_suite")
sys.path.insert(0, str(GOOGLE_SUITE))

from sheets import update_range  # noqa: E402


SPREADSHEET_ID = "1ZUgq7srd2P835fA_Kge80ZpiFJjvUwBR_PXCjZsU688"


lead_row = [[
    "Knock Knock Boutique",
    "https://shopknockknock.com/",
    "Boutique / Jewelry / Accessories",
    "Hershey / Elizabethtown",
    "PA",
    "Manual website audit",
    "Emily Drobnock",
    "knockknockboutique@gmail.com",
    "https://shopknockknock.com/pages/contact",
    "https://www.instagram.com/shopknockknock",
    "17",
    "Strong: send personalized audit/lookbook",
    4,
    2,
    4,
    3,
    4,
    "distinctive boutique voice and product/event offerings could be organized into clearer shopping and content pathways",
    "site has strong raw material but some friction: test menu text, typo in hero copy, repeated copy, and permanent jewelry/event content could be more conversion-focused",
    "Content Bank + Brand/Social Direction",
    "Content Bank for a whimsical jewelry/accessories boutique, focused on turning product drops, permanent jewelry, events, style quiz, reviews, and founder story into clearer shopping pathways and recurring social content.",
    "Subject: Quick content ideas for Knock Knock Boutique\n\nHi Emily,\n\nI came across Knock Knock and loved how much personality is already built into the brand: the Jewel Box concept, permanent jewelry, the \"Shop. Sparkle. Conquer.\" voice, two shop locations, and the whole whimsical accessories-for-every-adventure feel.\n\nThe opportunity I noticed is not that the brand lacks charm. It is that the site and social content could package that charm into clearer shopping paths and repeatable content series. A few areas I would look at:\n\n- Turn Jewel Box personas like The Trailblazer, The Professional, The Trendsetter, and The Socialite into stronger social/shop pathways\n- Create recurring content around permanent jewelry, gifting, events, and \"what to wear where\" styling ideas\n- Use customer review language and the family-owned/founder story as trust-building content\n- Clean up a few website friction points so the boutique feels as polished online as the in-store experience likely is\n\nI run Lift Studio, where I create website/social mini-audits and monthly Content Growth Kits for service and retail businesses. I put together a short audit angle for Knock Knock and would be happy to send it over if useful.\n\nBest,\nMegan",
    "Audit angle drafted",
    "",
    "",
    "",
    "Strong fit for Content Bank. Website has distinctive brand voice, product personas, permanent jewelry, two locations, blog, reviews, newsletter, and style quiz. Needs Instagram/manual review before sending. Website quick friction: visible 'Test Menu', typo 'Unprepardness', repeated Jewel Box line, and mixed shop/event/permanent jewelry pathways.",
    "Hershey: 717-298-6331; Elizabethtown: 717-689-3238",
    "https://shopknockknock.com/pages/contact",
    "",
    "",
    "",
    "Review Instagram manually; then create mini-audit around Jewel Box personas, permanent jewelry, events, gifting, and style quiz content.",
    "Sources reviewed: homepage, about, contact, permanent jewelry. Brand has strong voice and product/content hooks; needs social/website pathway packaging.",
]]


mini_audit_row = [[
    "Knock Knock Boutique",
    "https://shopknockknock.com/",
    "Boutique / Jewelry / Accessories",
    "Hershey / Elizabethtown",
    "PA",
    "17",
    "Strong: send personalized audit/lookbook",
    "Content Bank + Brand/Social Direction",
    "Review after Instagram audit",
    "distinctive boutique voice and product/event offerings could be organized into clearer shopping and content pathways",
    "turn product interest, events, and permanent jewelry into shop visits and online purchases",
    "Build clearer shopping/content pathways around Jewel Box personas, permanent jewelry, events, gifting, reviews, and the style quiz.",
    "Mini Website + Content Audit: Knock Knock Boutique\n\n1. What is already working\n- Knock Knock has a distinctive boutique personality: whimsical, sparkly, playful, family-owned, and rooted in the Hershey/Elizabethtown area.\n- The site has strong raw material: Jewel Box product personas, accessories, permanent jewelry, events, testimonials, blog posts, newsletter signup, and a style quiz.\n- The About page gives the brand real story and credibility: founded in 2014 by Emily Drobnock, family-owned, handpicked accessories, and a focus on personalized shopping.\n\n2. Main opportunity\n- The brand has charm, but the shopping/content pathways could be clearer.\n- Why this matters: a new visitor should quickly understand whether to shop Jewel Box, book permanent jewelry, visit a store, take the style quiz, or follow for events and product drops.\n\n3. Secondary content opportunity\n- The existing brand language and products could become stronger recurring social series.\n- Examples: Jewel Box personas, permanent jewelry events, gift guides, \"what to wear where,\" customer favorites, staff picks, downtown Hershey shopping, and behind-the-scenes buying/curating.\n\n4. Quick win\n- Create a \"Start Here\" pathway with four clear actions: Shop Jewel Box, Book Permanent Jewelry, Visit Our Shops, Take The Style Quiz. Then turn those same pathways into pinned social posts and recurring content pillars.\n\n5. Recommended first fix\n- Start with a Content Bank plus Brand/Social Direction: clarify the website pathways, clean small site friction points, and build a month of content around product personas, permanent jewelry, events, gifting, and customer proof.",
    "Recommended paid offer: Content Bank + Brand/Social Direction\n\nWhat I would build:\n- 10 ready-to-film UGC-style video concepts\n- 10 static post or carousel concepts\n- 25 caption hooks\n- 1 monthly content calendar\n- 3 pinned post recommendations after Instagram review\n- 1 monthly promo/event/content series idea\n- Light brand/content direction notes\n\nMonth 1 focus:\n- Jewel Box persona content\n- Permanent jewelry education and event content\n- Gift guides and styling ideas\n- Founder/family-owned story\n- Review-to-Reel social proof\n- Style quiz promotion\n- Visit Hershey / Elizabethtown shop prompts\n\nBest next step: manually review Instagram, then send a personalized mini-audit framed around turning Knock Knock's existing charm into clearer shopping paths and a repeatable content system.",
    "Review after Instagram audit",
]]


def main() -> None:
    update_range(SPREADSHEET_ID, "Leads!A20:AH20", lead_row)
    update_range(SPREADSHEET_ID, "'Mini Audits'!A20:O20", mini_audit_row)
    print("Added Knock Knock Boutique to Leads row 20 and Mini Audits row 20.")


if __name__ == "__main__":
    main()
