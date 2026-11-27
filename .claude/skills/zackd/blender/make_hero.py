"""Build the hero man (MakeHuman/MPFB2, CC0) headless with the bpy module and export assets/shared/models/hero_male.glb.

  python3 blender/make_hero.py <mpfb2_src_dir> <makehuman_data_dir> [out.glb]
    mpfb2_src_dir     : .../mpfb2/src                    (git clone https://github.com/makehumancommunity/mpfb2)
    makehuman_data_dir: .../makehuman-core/data          (CC0 system assets: skins eyes eyebrows eyelashes teeth tongue hair clothes)
Young adult male, navy shirt + jeans (male_casualsuit01), short dark hair, default MPFB rig (with face bones).
"""
import sys, os
import bpy, addon_utils

SRC, DATA = sys.argv[1], sys.argv[2]
OUT = sys.argv[3] if len(sys.argv) > 3 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'shared', 'models', 'hero_male.glb')
# MPFB must run as a Blender extension: link it into the user extension repo and enable it
ext = os.path.join(bpy.utils.user_resource('EXTENSIONS'), 'user_default')
os.makedirs(ext, exist_ok=True)
link = os.path.join(ext, 'mpfb')
if not os.path.exists(link): os.symlink(os.path.join(os.path.abspath(SRC), 'mpfb'), link)
bpy.ops.extensions.repo_refresh_all() if hasattr(bpy.ops.extensions, 'repo_refresh_all') else None
addon_utils.enable('bl_ext.user_default.mpfb', default_set=True)
import importlib
M = lambda mod, key: getattr(importlib.import_module('bl_ext.user_default.mpfb.services.' + mod), key)
HumanService, TargetService = M('humanservice', 'HumanService'), M('targetservice', 'TargetService')
ExportService, ObjectService = M('exportservice', 'ExportService'), M('objectservice', 'ObjectService')

addon_utils.enable('io_scene_gltf2', default_set=True)
for o in list(bpy.data.objects): bpy.data.objects.remove(o)

macro = TargetService.get_default_macro_info_dict()
macro.update({'gender': 1.0, 'age': 0.5, 'muscle': 0.56, 'weight': 0.5, 'height': 0.56, 'proportions': 0.6})
macro['race'] = {'african': 0.0, 'asian': 0.0, 'caucasian': 1.0}
basemesh = HumanService.create_human(macro_detail_dict=macro)
P = lambda *a: os.path.join(DATA, *a)
HumanService.set_character_skin(P('skins', 'young_caucasian_male', 'young_caucasian_male.mhmat'), basemesh, skin_type='GAMEENGINE')
HumanService.add_builtin_rig(basemesh, 'default')
for sub, f, t in [('eyes/high-poly', 'high-poly.mhclo', 'Eyes'), ('eyebrows/eyebrow001', 'eyebrow001.mhclo', 'Eyebrows'),
                  ('eyelashes/eyelashes01', 'eyelashes01.mhclo', 'Eyelashes'), ('tongue/tongue01', 'tongue01.mhclo', 'Tongue'),
                  ('teeth/teeth_base', 'teeth_base.mhclo', 'Teeth'), ('hair/short02', 'short02.mhclo', 'Hair'),
                  ('clothes/male_casualsuit01', 'male_casualsuit01.mhclo', 'Clothes'), ('clothes/shoes01', 'shoes01.mhclo', 'Clothes')]:
    path = P(*sub.split('/'), f)
    if not os.path.exists(path): print('MISSING', path); continue
    HumanService.add_mhclo_asset(path, basemesh, asset_type=t, material_type='GAMEENGINE')
    print('added', t, f)

root = ExportService.create_character_copy(basemesh, name_suffix='_export')
eb = ObjectService.find_object_of_type_amongst_nearest_relatives(root, 'Basemesh')
ExportService.bake_modifiers_remove_helpers(eb, bake_masks=True, bake_subdiv=False, remove_helpers=True, also_proxy=True)
objs = [root] + list(ObjectService.get_list_of_children(root))
bpy.ops.object.select_all(action='DESELECT')
for o in objs:
    if o.type == 'MESH' and o.data.shape_keys:                 # targets are already applied; drop the keys for a small glb
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        bpy.ops.object.shape_key_remove(all=True, apply_mix=True)
bpy.ops.object.select_all(action='DESELECT')
for o in objs: o.select_set(True)
bpy.context.view_layer.objects.active = root
os.makedirs(os.path.dirname(os.path.abspath(OUT)), exist_ok=True)
bpy.ops.export_scene.gltf(filepath=os.path.abspath(OUT), use_selection=True, export_format='GLB', export_animations=False,
                          export_image_format='JPEG', export_jpeg_quality=88, export_skins=True, export_morph=False, export_apply=False)
print('WROTE', os.path.abspath(OUT), [o.name for o in objs])
