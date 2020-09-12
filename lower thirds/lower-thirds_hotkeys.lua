--[[
      OBS Studio Lua script : Control the switches of the lower thirds with hotkeys
      Author: NoeAL
      Version: 0.1
      Released: 2020-09-02
--]]


local obs = obslua
local source, increment, interval, reset, debug
local sceneItem
local direction = 1
local hk = {}
local hotkeyMasterSwitch = 0;
local hotkeySwitch1 = 0;
local hotkeySwitch2 = 0;
local hotkeySwitch3 = 0;
local hotkeySwitch4 = 0;


-- if you are extending the script, you can add more hotkeys here
-- then add actions in the 'onHotKey' function further below
local hotkeys = {
	SWITCH_main = "Main switch",
	SWITCH_1 = "Lower third switch #1",
	SWITCH_2 = "Lower third switch #2",
	SWITCH_3 = "Lower third switch #3",
	SWITCH_4 = "Lower third switch #4",
}


-- add any custom actions here
local function onHotKey(action)
	obs.timer_remove(rotate)
	if debug then obs.script_log(obs.LOG_INFO, string.format("Hotkey : %s", action)) end

	if action == "SWITCH_main" then
		if hotkeyMasterSwitch == 0 then
			hotkeyMasterSwitch = 1
		else
			hotkeyMasterSwitch = 0
		end
		update_hotkeys_js()
	elseif action == "SWITCH_1" then
		if hotkeySwitch1 == 0 then
			hotkeySwitch1 = 1
		else
			hotkeySwitch1 = 0
		end
		update_hotkeys_js()
	elseif action == "SWITCH_2" then
		if hotkeySwitch2 == 0 then
			hotkeySwitch2 = 1
		else
			hotkeySwitch2 = 0
		end
		update_hotkeys_js()
	elseif action == "SWITCH_3" then
		if hotkeySwitch3 == 0 then
			hotkeySwitch3 = 1
		else
			hotkeySwitch3 = 0
		end
		update_hotkeys_js()
	elseif action == "SWITCH_4" then
		if hotkeySwitch4 == 0 then
			hotkeySwitch4 = 1
		else
			hotkeySwitch4 = 0
		end
		update_hotkeys_js()
	end
end


-- write settings to js file
function update_hotkeys_js()
    local output = assert(io.open(script_path() .. '../common/js/hotkeys.js', "w"))
    output:write('hotkeyMasterSwitch = '.. hotkeyMasterSwitch .. ';\n')
    output:write('hotkeySwitch1 = '.. hotkeySwitch1 .. ';\n')
    output:write('hotkeySwitch2 = '.. hotkeySwitch2 .. ';\n')
    output:write('hotkeySwitch3 = '.. hotkeySwitch3 .. ';\n')
    output:write('hotkeySwitch4 = '.. hotkeySwitch4 .. ';\n')
    output:close()
end

----------------------------------------------------------

-- called on startup
function script_load(settings)
	for k, v in pairs(hotkeys) do
		hk[k] = obs.obs_hotkey_register_frontend(k, v, function(pressed) if pressed then onHotKey(k) end end)
		local hotkeyArray = obs.obs_data_get_array(settings, k)
		obs.obs_hotkey_load(hk[k], hotkeyArray)
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