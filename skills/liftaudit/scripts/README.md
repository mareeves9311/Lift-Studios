# liftaudit Scripts

Helper scripts for `$liftaudit`. They are optional and should not install dependencies automatically.

## Optional Dependencies

```bash
python3 -m pip install playwright beautifulsoup4 requests Pillow
python3 -m playwright install chromium
```

## Scripts

- `capture_site.py`: capture desktop and mobile screenshots with Playwright.
- `download_site_assets.py`: collect first-party image assets from a public site.
- `extract_brand_palette.py`: draft a palette from local images.
- `build_asset_manifest.py`: scan asset folders and build `asset-manifest.csv`.
- `validate_audit_assets.py`: confirm required audit inputs exist before concept generation.
