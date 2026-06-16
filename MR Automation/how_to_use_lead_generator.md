# How To Use The Lead Generator

## 1. Create An Input CSV

Use `sample_leads_input.csv` as the template.

Required useful columns:

- `business_name`
- `website`
- `category`
- `city`
- `state`
- `top_issue`
- `secondary_issue`
- `booking_path`
- `credibility_notes`
- `website_notes`

The more specific `top_issue` and `secondary_issue` are, the better the drafted email will be.

## 2. Run The Generator

From this folder:

```bash
python3 lead_audit_generator.py sample_leads_input.csv -o sample_scored_leads.csv
```

For a real lead batch:

```bash
python3 lead_audit_generator.py leads_batch_001.csv -o leads_batch_001_scored.csv
```

## 3. Read The Output

The output CSV includes:

- Total score
- Outreach priority
- Scoring breakdown
- Recommended offer
- Pitch angle
- Draft outreach email

## 4. Outreach Rules

- Score 17-20: record a short Loom or send a mini-audit
- Score 13-16: send personalized cold email
- Score 9-12: send wide outreach only
- Score under 9: skip

## Next Automation Upgrade

The next upgrade is a research helper that takes a niche and city, searches for candidate businesses, and creates the first draft lead batch automatically.
