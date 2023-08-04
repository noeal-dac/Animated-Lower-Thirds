--[[
      OBS Studio Lua script : Control the switches of the lower thirds with hotkeys
      Author: NoeAL
      Version: 0.2
      Released: 2020-09-28
--]]


local obs = obslua
local debug
local hk = {}
local hotkeys = {}
local hotkeyMasterSwitch = 0;
local A_SWITCH_0_main = "Main Switch";

for i = 1,10,1 do
	_G['hotkeySwitch' .. i] = 0;
	hotkeys['A_SWITCH_' .. i] = "Lower Third Switch #" .. i;

	for j = 1,10,1 do
		_G['hotkeyAlt' .. i .. 'Slot' .. j] = 0;
		hotkeys['LT' .. i .. '_SLT' .. j] = "Load Slot #" .. i .. " on LT#" .. j;
	end
end

local function ternary ( cond , T , F )
    if cond then return T else return F end
end

-- add any custom actions here
local function onHotKey(action)
	--obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	hotkeyMasterSwitch = (action == "A_SWITCH_0_main") and 1 or 0;

	for i = 1,10,1 do
		_G['hotkeySwitch' .. i] = (action == "A_SWITCH_" .. i) and 1 or 0;
	
		for j = 1,10,1 do
			_G['LT' .. i .. '_SLT' .. j] = (action == 'LT' .. i .. '_SLT' .. j) and 1 or 0;
		end
	end


	update_hotkeys_js();
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. '../common/js/hotkeys.js', "w"));
    output:write('hotKeys = {\n');
	output:write('  change: ' .. os.clock() .. ',\n');
	output:write('  switches: {\n');
	output:write('    master: ' .. hotkeyMasterSwitch .. ',\n');
	for i = 1,10,1 do
		output:write('    lt' .. i .. ': ' .. _G['hotkeySwitch' .. i] .. ',\n');
	end
	output:write('  },\n');
	output:write('  loadSlots: {\n');
	for i = 1,10,1 do
		output:write('    lt' .. i .. ': {\n');
		for j = 1,10,1 do
			output:write('      slot' .. j .. ': '.. _G['hotkeyAlt' .. i .. 'Slot' .. j] .. ',\n');
		end
		output:write('    },\n');
	end
	output:write('  },\n');
	output:write('};');
	output:close()
end

----------------------------------------------------------

-- called on startup
function script_load(settings)
	function pairsByKeys (t, f)
		local a = {}
		for n in pairs(t) do table.insert(a, n) end
		table.sort(a, f)
		local i = 0
		local iter = function ()
		  i = i + 1
		  if a[i] == nil then return nil
		  else return a[i], t[a[i]]
		  end
		end
		return iter
	end	

	for name, line in pairsByKeys(hotkeys) do
		hk[name] = obs.obs_hotkey_register_frontend(name, line, function(pressed) if pressed then onHotKey(name) end end)
		local hotkeyArray = obs.obs_data_get_array(settings, name)
		obs.obs_hotkey_load(hk[name], hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end	
	update_hotkeys_js()
end


-- called on unload
function script_unload()
end


-- called when settings changed
function script_update(settings)
	debug = obs.obs_data_get_bool(settings, "debug")
end


-- return description shown to user
function script_description()
	return "Control the switches of the lower thirds with hotkeys"
end


-- define properties that user can change
function script_properties()
	local props = obs.obs_properties_create()
	obs.obs_properties_add_bool(props, "debug", "Debug")
	return props
end


-- set default values
function script_defaults(settings)
	obs.obs_data_set_default_bool(settings, "debug", false)
end


-- save additional data not set by user
function script_save(settings)
	for k, v in pairs(hotkeys) do
		local hotkeyArray = obs.obs_hotkey_save(hk[k])
		obs.obs_data_set_array(settings, k, hotkeyArray)
		obs.obs_data_array_release(hotkeyArray)
	end
end