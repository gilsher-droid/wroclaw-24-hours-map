"""Version public album UI assets without including any account/media record."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parents[1]/'public/personal-trips'
assets={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(root.iterdir()) if p.suffix in {'.js','.css'} and p.is_file()}
(root/'album-assets.json').write_text(json.dumps(assets,indent=2)+'\n')
