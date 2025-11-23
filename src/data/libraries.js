// ============================================
// ESP32 Libraries Data
// Common libraries organized by language/framework
// ============================================

export const languageCategories = [
  { id: 'arduino', name: 'Arduino/C++', color: 'cyan', icon: 'A' },
  { id: 'espidf', name: 'ESP-IDF (C)', color: 'red', icon: 'E' },
  { id: 'platformio', name: 'PlatformIO', color: 'orange', icon: 'P' },
  { id: 'micropython', name: 'MicroPython', color: 'yellow', icon: 'M' },
  { id: 'rust', name: 'Rust', color: 'amber', icon: 'R' },
  { id: 'circuitpython', name: 'CircuitPython', color: 'purple', icon: 'C' },
]

export const libraries = [
  // ============================================
  // Arduino/C++ Libraries
  // ============================================
  {
    id: 'arduino-esp32',
    name: 'Arduino-ESP32',
    language: 'arduino',
    author: 'Espressif',
    description: 'Official Arduino core for ESP32. Provides Arduino framework compatibility for all ESP32 variants with WiFi, BLE, and peripheral support.',
    github: 'https://github.com/espressif/arduino-esp32',
    documentation: 'https://docs.espressif.com/projects/arduino-esp32/',
    installMethod: 'Arduino IDE: Add board URL to preferences, install via Board Manager',
    installCode: 'https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['WiFi', 'BLE', 'GPIO', 'ADC', 'DAC', 'I2C', 'SPI', 'UART', 'PWM', 'Touch', 'RMT', 'TWAI'],
    popularity: 'high',
    tags: ['core', 'official', 'firmware'],
    codeExample: `#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  WiFi.begin("SSID", "password");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}

void loop() {}`,
    notes: ['Required base for Arduino development', 'Version 2.x uses ESP-IDF 4.4', 'Version 3.x uses ESP-IDF 5.x'],
  },
  {
    id: 'wifimanager',
    name: 'WiFiManager',
    language: 'arduino',
    author: 'tzapu',
    description: 'ESP8266/ESP32 WiFi connection manager with captive portal for easy configuration. Automatically connects to saved networks or opens a config portal.',
    github: 'https://github.com/tzapu/WiFiManager',
    documentation: 'https://github.com/tzapu/WiFiManager#readme',
    installMethod: 'Arduino Library Manager: Search "WiFiManager"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Captive Portal', 'Auto-connect', 'Custom Parameters', 'Timeout Config', 'Static IP'],
    popularity: 'high',
    tags: ['wifi', 'config', 'networking', 'portal'],
    codeExample: `#include <WiFiManager.h>

void setup() {
  WiFiManager wm;

  // Auto-connect or start config portal
  bool res = wm.autoConnect("ESP32-Setup", "password");

  if (!res) {
    Serial.println("Failed to connect");
    ESP.restart();
  }
  Serial.println("Connected!");
}

void loop() {}`,
    notes: ['Great for IoT devices without hardcoded credentials', 'Supports custom config parameters'],
  },
  {
    id: 'espasyncwebserver',
    name: 'ESPAsyncWebServer',
    language: 'arduino',
    author: 'me-no-dev',
    description: 'Async HTTP and WebSocket server library. Handles multiple connections efficiently without blocking the main loop.',
    github: 'https://github.com/me-no-dev/ESPAsyncWebServer',
    documentation: 'https://github.com/me-no-dev/ESPAsyncWebServer#readme',
    installMethod: 'Download from GitHub (requires AsyncTCP dependency)',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Async HTTP', 'WebSocket', 'SSE', 'Template Engine', 'Static Files', 'URL Rewriting'],
    popularity: 'high',
    tags: ['web', 'server', 'async', 'websocket'],
    dependencies: ['AsyncTCP'],
    codeExample: `#include <WiFi.h>
#include <ESPAsyncWebServer.h>

AsyncWebServer server(80);

void setup() {
  WiFi.begin("SSID", "password");
  while (WiFi.status() != WL_CONNECTED) delay(500);

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", "<h1>Hello ESP32!</h1>");
  });

  server.begin();
}

void loop() {}`,
    notes: ['Requires AsyncTCP library', 'Much more efficient than standard WebServer'],
  },
  {
    id: 'pubsubclient',
    name: 'PubSubClient',
    language: 'arduino',
    author: 'knolleary',
    description: 'MQTT client library for Arduino. Supports publish/subscribe messaging for IoT applications.',
    github: 'https://github.com/knolleary/pubsubclient',
    documentation: 'https://pubsubclient.knolleary.net/',
    installMethod: 'Arduino Library Manager: Search "PubSubClient"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6'],
    features: ['MQTT 3.1.1', 'QoS 0/1', 'Last Will', 'Retained Messages', 'TLS Support'],
    popularity: 'high',
    tags: ['mqtt', 'iot', 'messaging', 'networking'],
    codeExample: `#include <WiFi.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message on ");
  Serial.println(topic);
}

void setup() {
  WiFi.begin("SSID", "password");
  client.setServer("broker.hivemq.com", 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    client.connect("ESP32Client");
    client.subscribe("esp32/test");
  }
  client.loop();
}`,
    notes: ['Default message buffer is 256 bytes', 'Use setBufferSize() for larger messages'],
  },
  {
    id: 'arduinojson',
    name: 'ArduinoJson',
    language: 'arduino',
    author: 'bblanchon',
    description: 'Efficient JSON library for embedded systems. Handles parsing and serialization with minimal memory footprint.',
    github: 'https://github.com/bblanchon/ArduinoJson',
    documentation: 'https://arduinojson.org/',
    installMethod: 'Arduino Library Manager: Search "ArduinoJson"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['JSON Parsing', 'JSON Serialization', 'MessagePack', 'Stream Support', 'Zero-copy'],
    popularity: 'high',
    tags: ['json', 'data', 'parsing', 'serialization'],
    codeExample: `#include <ArduinoJson.h>

void setup() {
  Serial.begin(115200);

  // Parse JSON
  String input = "{\\"sensor\\":\\"temperature\\",\\"value\\":25.5}";
  JsonDocument doc;
  deserializeJson(doc, input);

  const char* sensor = doc["sensor"];
  float value = doc["value"];

  // Create JSON
  JsonDocument response;
  response["status"] = "ok";
  response["reading"] = value;
  serializeJson(response, Serial);
}

void loop() {}`,
    notes: ['Version 7 uses JsonDocument instead of StaticJsonDocument', 'Use Assistant at arduinojson.org for sizing'],
  },
  {
    id: 'fastled',
    name: 'FastLED',
    language: 'arduino',
    author: 'FastLED',
    description: 'High-performance LED library supporting WS2812, APA102, and many other addressable LED strips.',
    github: 'https://github.com/FastLED/FastLED',
    documentation: 'https://fastled.io/',
    installMethod: 'Arduino Library Manager: Search "FastLED"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['WS2812B', 'APA102', 'SK6812', 'Color Palettes', 'HSV Support', 'Power Management'],
    popularity: 'high',
    tags: ['led', 'neopixel', 'rgb', 'animation'],
    codeExample: `#include <FastLED.h>

#define NUM_LEDS 30
#define DATA_PIN 5

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(50);
}

void loop() {
  // Rainbow effect
  static uint8_t hue = 0;
  fill_rainbow(leds, NUM_LEDS, hue++, 7);
  FastLED.show();
  delay(20);
}`,
    notes: ['Uses RMT peripheral on ESP32 for reliable timing', 'ESP32-S3 may need I2S driver'],
  },
  {
    id: 'adafruit-gfx',
    name: 'Adafruit GFX Library',
    language: 'arduino',
    author: 'Adafruit',
    description: 'Core graphics library for displays. Provides common drawing primitives used by display-specific libraries.',
    github: 'https://github.com/adafruit/Adafruit-GFX-Library',
    documentation: 'https://learn.adafruit.com/adafruit-gfx-graphics-library',
    installMethod: 'Arduino Library Manager: Search "Adafruit GFX"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6'],
    features: ['Drawing Primitives', 'Text Rendering', 'Custom Fonts', 'Bitmaps', 'Buttons'],
    popularity: 'high',
    tags: ['display', 'graphics', 'tft', 'oled'],
    codeExample: `#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Hello!");
  display.display();
}

void loop() {}`,
    notes: ['Base library - requires display-specific driver', 'Supports custom fonts via fontconvert tool'],
  },
  {
    id: 'tft-espi',
    name: 'TFT_eSPI',
    language: 'arduino',
    author: 'Bodmer',
    description: 'Optimized TFT display library for ESP32. Very fast SPI driver supporting many common displays.',
    github: 'https://github.com/Bodmer/TFT_eSPI',
    documentation: 'https://github.com/Bodmer/TFT_eSPI#readme',
    installMethod: 'Arduino Library Manager: Search "TFT_eSPI"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['ILI9341', 'ST7789', 'ILI9488', 'Sprites', 'Smooth Fonts', 'Touch Support'],
    popularity: 'high',
    tags: ['display', 'tft', 'graphics', 'spi'],
    codeExample: `#include <TFT_eSPI.h>

TFT_eSPI tft = TFT_eSPI();

void setup() {
  tft.init();
  tft.setRotation(1);
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  tft.setTextSize(2);
  tft.drawString("Hello ESP32!", 10, 10);
}

void loop() {}`,
    notes: ['Configure pins in User_Setup.h', 'Much faster than Adafruit libraries on ESP32'],
  },
  {
    id: 'esp32-ble-arduino',
    name: 'ESP32 BLE Arduino',
    language: 'arduino',
    author: 'nkolban',
    description: 'BLE library for ESP32 providing server and client functionality. Built into Arduino-ESP32 core.',
    github: 'https://github.com/nkolban/ESP32_BLE_Arduino',
    documentation: 'https://github.com/nkolban/esp32-snippets',
    installMethod: 'Included in Arduino-ESP32 core',
    supportedVariants: ['esp32', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['BLE Server', 'BLE Client', 'GATT', 'Advertising', 'Notifications', 'Bonding'],
    popularity: 'high',
    tags: ['ble', 'bluetooth', 'wireless'],
    codeExample: `#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHAR_UUID    "beb5483e-36e1-4688-b7f5-ea07361b26a8"

void setup() {
  BLEDevice::init("ESP32-BLE");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  BLECharacteristic *pChar = pService->createCharacteristic(
    CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
  );
  pChar->setValue("Hello BLE");
  pService->start();

  BLEAdvertising *pAdv = BLEDevice::getAdvertising();
  pAdv->start();
}

void loop() {}`,
    notes: ['Included in core - no separate install needed', 'Uses significant flash/RAM'],
  },

  // ============================================
  // ESP-IDF Libraries
  // ============================================
  {
    id: 'esp-idf',
    name: 'ESP-IDF',
    language: 'espidf',
    author: 'Espressif',
    description: 'Official development framework for ESP32. Provides low-level access to all chip features with FreeRTOS.',
    github: 'https://github.com/espressif/esp-idf',
    documentation: 'https://docs.espressif.com/projects/esp-idf/',
    installMethod: 'VSCode Extension or command line installation',
    installCode: 'git clone --recursive https://github.com/espressif/esp-idf.git',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2', 'esp32-p4'],
    features: ['FreeRTOS', 'WiFi', 'BLE', 'Mesh', 'OTA', 'NVS', 'All Peripherals'],
    popularity: 'high',
    tags: ['core', 'official', 'firmware', 'rtos'],
    codeExample: `#include "esp_wifi.h"
#include "esp_log.h"
#include "nvs_flash.h"

static const char *TAG = "wifi_example";

void app_main(void) {
    ESP_ERROR_CHECK(nvs_flash_init());

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = "SSID",
            .password = "password",
        },
    };

    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    ESP_LOGI(TAG, "WiFi started");
}`,
    notes: ['Full control over chip features', 'Steeper learning curve than Arduino', 'Required for advanced features'],
  },
  {
    id: 'esp-mqtt',
    name: 'ESP-MQTT',
    language: 'espidf',
    author: 'Espressif',
    description: 'Official MQTT client component for ESP-IDF. Supports MQTT 3.1.1 and 5.0 with TLS.',
    github: 'https://github.com/espressif/esp-mqtt',
    documentation: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/mqtt.html',
    installMethod: 'Included in ESP-IDF',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['MQTT 3.1.1', 'MQTT 5.0', 'TLS/SSL', 'WebSocket', 'QoS 0/1/2', 'Auto Reconnect'],
    popularity: 'high',
    tags: ['mqtt', 'iot', 'messaging'],
    codeExample: `#include "mqtt_client.h"

static void mqtt_event_handler(void *args, esp_event_base_t base,
                               int32_t event_id, void *event_data) {
    esp_mqtt_event_handle_t event = event_data;
    switch (event->event_id) {
        case MQTT_EVENT_CONNECTED:
            esp_mqtt_client_subscribe(event->client, "/topic/test", 0);
            esp_mqtt_client_publish(event->client, "/topic/test", "hello", 0, 1, 0);
            break;
        case MQTT_EVENT_DATA:
            printf("Received: %.*s\\n", event->data_len, event->data);
            break;
    }
}

void app_main(void) {
    esp_mqtt_client_config_t mqtt_cfg = {
        .broker.address.uri = "mqtt://broker.hivemq.com",
    };
    esp_mqtt_client_handle_t client = esp_mqtt_client_init(&mqtt_cfg);
    esp_mqtt_client_register_event(client, ESP_EVENT_ANY_ID, mqtt_event_handler, NULL);
    esp_mqtt_client_start(client);
}`,
    notes: ['Built into ESP-IDF', 'More feature-complete than Arduino alternatives'],
  },

  // ============================================
  // PlatformIO Libraries
  // ============================================
  {
    id: 'platformio',
    name: 'PlatformIO Core',
    language: 'platformio',
    author: 'PlatformIO',
    description: 'Professional IDE and build system for embedded development. Manages frameworks, libraries, and toolchains.',
    github: 'https://github.com/platformio/platformio-core',
    documentation: 'https://docs.platformio.org/',
    installMethod: 'VSCode Extension: Search "PlatformIO IDE"',
    installCode: 'pip install platformio',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['Multi-framework', 'Library Manager', 'Unit Testing', 'Debugging', 'CI/CD'],
    popularity: 'high',
    tags: ['ide', 'build', 'toolchain'],
    codeExample: `; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino

lib_deps =
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^7.0

monitor_speed = 115200`,
    notes: ['Supports Arduino and ESP-IDF frameworks', 'Excellent library dependency management'],
  },
  {
    id: 'esphome',
    name: 'ESPHome',
    language: 'platformio',
    author: 'ESPHome',
    description: 'YAML-based firmware for ESP devices. Creates Home Assistant compatible devices with no coding required.',
    github: 'https://github.com/esphome/esphome',
    documentation: 'https://esphome.io/',
    installMethod: 'pip install esphome',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Home Assistant', 'YAML Config', 'OTA Updates', 'Sensors', 'Displays', 'Automations'],
    popularity: 'high',
    tags: ['home-assistant', 'yaml', 'iot', 'smart-home'],
    codeExample: `# esphome.yaml
esphome:
  name: living-room-sensor
  platform: ESP32
  board: esp32dev

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

api:
  encryption:
    key: !secret api_key

sensor:
  - platform: dht
    pin: GPIO4
    temperature:
      name: "Living Room Temperature"
    humidity:
      name: "Living Room Humidity"`,
    notes: ['No programming required', 'Perfect for Home Assistant integration'],
  },

  // ============================================
  // MicroPython Libraries
  // ============================================
  {
    id: 'micropython',
    name: 'MicroPython',
    language: 'micropython',
    author: 'MicroPython',
    description: 'Python 3 implementation for microcontrollers. Write ESP32 code in Python with full hardware access.',
    github: 'https://github.com/micropython/micropython',
    documentation: 'https://docs.micropython.org/',
    installMethod: 'Flash firmware via esptool.py',
    installCode: 'esptool.py --chip esp32 write_flash -z 0x1000 esp32-firmware.bin',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Python 3 Syntax', 'REPL', 'WiFi', 'BLE', 'GPIO', 'I2C', 'SPI', 'PWM'],
    popularity: 'high',
    tags: ['python', 'firmware', 'scripting'],
    codeExample: `import network
import time

# Connect to WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect('SSID', 'password')

while not wlan.isconnected():
    time.sleep(0.5)
    print('Connecting...')

print('Connected:', wlan.ifconfig())`,
    notes: ['Easier learning curve than C/C++', 'Slower execution than compiled code', 'Great for prototyping'],
  },
  {
    id: 'umqtt-simple',
    name: 'umqtt.simple',
    language: 'micropython',
    author: 'MicroPython',
    description: 'Simple MQTT client for MicroPython. Lightweight implementation for IoT messaging.',
    github: 'https://github.com/micropython/micropython-lib',
    documentation: 'https://github.com/micropython/micropython-lib/tree/master/micropython/umqtt.simple',
    installMethod: 'mip.install("umqtt.simple")',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['MQTT 3.1.1', 'Publish', 'Subscribe', 'QoS 0/1'],
    popularity: 'medium',
    tags: ['mqtt', 'iot', 'messaging'],
    codeExample: `from umqtt.simple import MQTTClient
import time

client = MQTTClient("esp32", "broker.hivemq.com")
client.connect()

def callback(topic, msg):
    print(f"Received: {msg} on {topic}")

client.set_callback(callback)
client.subscribe(b"esp32/test")
client.publish(b"esp32/test", b"Hello from ESP32!")

while True:
    client.check_msg()
    time.sleep(1)`,
    notes: ['Install with mip package manager', 'Use umqtt.robust for auto-reconnect'],
  },
  {
    id: 'micropython-async',
    name: 'uasyncio',
    language: 'micropython',
    author: 'MicroPython',
    description: 'Async/await support for MicroPython. Write non-blocking code with coroutines.',
    github: 'https://github.com/micropython/micropython',
    documentation: 'https://docs.micropython.org/en/latest/library/asyncio.html',
    installMethod: 'Built into MicroPython firmware',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Coroutines', 'Tasks', 'Event Loop', 'Streams', 'Locks'],
    popularity: 'medium',
    tags: ['async', 'concurrent', 'tasks'],
    codeExample: `import asyncio
from machine import Pin

led = Pin(2, Pin.OUT)

async def blink():
    while True:
        led.value(not led.value())
        await asyncio.sleep(0.5)

async def print_status():
    while True:
        print("LED:", "ON" if led.value() else "OFF")
        await asyncio.sleep(1)

async def main():
    await asyncio.gather(blink(), print_status())

asyncio.run(main())`,
    notes: ['Built into recent MicroPython versions', 'Essential for responsive applications'],
  },

  // ============================================
  // Rust Libraries
  // ============================================
  {
    id: 'esp-rs',
    name: 'esp-rs (Rust on ESP)',
    language: 'rust',
    author: 'esp-rs',
    description: 'Rust ecosystem for ESP chips. Includes HAL, std support, and no_std bare-metal options.',
    github: 'https://github.com/esp-rs',
    documentation: 'https://esp-rs.github.io/book/',
    installMethod: 'espup install',
    installCode: 'cargo install espup && espup install',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['std Support', 'no_std', 'async', 'Embassy', 'WiFi', 'BLE'],
    popularity: 'medium',
    tags: ['rust', 'firmware', 'embedded'],
    codeExample: `use esp_idf_svc::wifi::{EspWifi, Configuration};
use esp_idf_svc::eventloop::EspSystemEventLoop;
use esp_idf_svc::nvs::EspDefaultNvsPartition;

fn main() -> anyhow::Result<()> {
    esp_idf_svc::sys::link_patches();

    let peripherals = Peripherals::take()?;
    let sysloop = EspSystemEventLoop::take()?;
    let nvs = EspDefaultNvsPartition::take()?;

    let mut wifi = EspWifi::new(peripherals.modem, sysloop, Some(nvs))?;

    wifi.set_configuration(&Configuration::Client(ClientConfiguration {
        ssid: "SSID".into(),
        password: "password".into(),
        ..Default::default()
    }))?;

    wifi.start()?;
    wifi.connect()?;

    Ok(())
}`,
    notes: ['Growing ecosystem', 'Memory safety guarantees', 'RISC-V chips have best support'],
  },
  {
    id: 'esp-idf-hal',
    name: 'esp-idf-hal',
    language: 'rust',
    author: 'esp-rs',
    description: 'Hardware Abstraction Layer for ESP-IDF in Rust. Provides safe Rust wrappers for peripherals.',
    github: 'https://github.com/esp-rs/esp-idf-hal',
    documentation: 'https://docs.esp-rs.org/esp-idf-hal/',
    installMethod: 'Add to Cargo.toml',
    installCode: '[dependencies]\nesp-idf-hal = "0.43"',
    supportedVariants: ['esp32', 'esp32-s2', 'esp32-s3', 'esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['GPIO', 'I2C', 'SPI', 'UART', 'ADC', 'PWM', 'RMT'],
    popularity: 'medium',
    tags: ['rust', 'hal', 'peripherals'],
    codeExample: `use esp_idf_hal::gpio::PinDriver;
use esp_idf_hal::peripherals::Peripherals;
use std::thread;
use std::time::Duration;

fn main() -> anyhow::Result<()> {
    let peripherals = Peripherals::take()?;
    let mut led = PinDriver::output(peripherals.pins.gpio2)?;

    loop {
        led.set_high()?;
        thread::sleep(Duration::from_millis(500));
        led.set_low()?;
        thread::sleep(Duration::from_millis(500));
    }
}`,
    notes: ['Uses embedded-hal traits', 'Works with ESP-IDF bindings'],
  },
  {
    id: 'embassy-rs',
    name: 'Embassy',
    language: 'rust',
    author: 'Embassy Project',
    description: 'Async embedded framework for Rust. Modern no_std async runtime with excellent ESP32-C3/C6 support.',
    github: 'https://github.com/embassy-rs/embassy',
    documentation: 'https://embassy.dev/',
    installMethod: 'Add to Cargo.toml',
    installCode: '[dependencies]\nembassy-executor = "0.5"\nembassy-time = "0.3"',
    supportedVariants: ['esp32-c3', 'esp32-c6', 'esp32-h2'],
    features: ['Async Runtime', 'no_std', 'Timers', 'GPIO', 'Networking'],
    popularity: 'medium',
    tags: ['rust', 'async', 'no_std', 'embedded'],
    codeExample: `#![no_std]
#![no_main]

use embassy_executor::Spawner;
use embassy_time::{Duration, Timer};
use esp_hal::gpio::{Level, Output};

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let peripherals = esp_hal::init(esp_hal::Config::default());
    let mut led = Output::new(peripherals.GPIO2, Level::Low);

    loop {
        led.toggle();
        Timer::after(Duration::from_millis(500)).await;
    }
}`,
    notes: ['Best support for RISC-V chips', 'True bare-metal async', 'No RTOS overhead'],
  },

  // ============================================
  // CircuitPython Libraries
  // ============================================
  {
    id: 'circuitpython',
    name: 'CircuitPython',
    language: 'circuitpython',
    author: 'Adafruit',
    description: 'Adafruit\'s Python for microcontrollers. Focus on education and ease of use with extensive library support.',
    github: 'https://github.com/adafruit/circuitpython',
    documentation: 'https://docs.circuitpython.org/',
    installMethod: 'Flash UF2 firmware or use esptool',
    supportedVariants: ['esp32-s2', 'esp32-s3', 'esp32-c3'],
    features: ['Python Syntax', 'USB Drive', 'REPL', 'Extensive Libraries', 'Education Focus'],
    popularity: 'medium',
    tags: ['python', 'firmware', 'education'],
    codeExample: `import board
import digitalio
import time

led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

while True:
    led.value = True
    time.sleep(0.5)
    led.value = False
    time.sleep(0.5)`,
    notes: ['Shows as USB drive for easy file editing', 'Huge library ecosystem', 'Best for beginners'],
  },
  {
    id: 'adafruit-circuitpython-esp32spi',
    name: 'Adafruit ESP32SPI',
    language: 'circuitpython',
    author: 'Adafruit',
    description: 'WiFi networking library for CircuitPython using ESP32 as a coprocessor or native support.',
    github: 'https://github.com/adafruit/Adafruit_CircuitPython_ESP32SPI',
    documentation: 'https://docs.circuitpython.org/projects/esp32spi/',
    installMethod: 'circup install adafruit_esp32spi',
    supportedVariants: ['esp32-s2', 'esp32-s3'],
    features: ['WiFi Client', 'HTTPS', 'Socket API', 'NTP'],
    popularity: 'medium',
    tags: ['wifi', 'networking'],
    codeExample: `import wifi
import socketpool
import adafruit_requests

wifi.radio.connect("SSID", "password")
print("Connected to", wifi.radio.ap_info.ssid)

pool = socketpool.SocketPool(wifi.radio)
requests = adafruit_requests.Session(pool)

response = requests.get("http://httpbin.org/get")
print(response.json())`,
    notes: ['Use native wifi module on S2/S3', 'Handles TLS/SSL'],
  },
]

// ============================================
// Helper Functions
// ============================================

export function getLibraryById(id) {
  return libraries.find(lib => lib.id === id)
}

export function getLibrariesByLanguage(languageId) {
  return libraries.filter(lib => lib.language === languageId)
}

export function getLanguageById(id) {
  return languageCategories.find(cat => cat.id === id)
}

export function searchLibraries(query) {
  const q = query.toLowerCase()
  return libraries.filter(lib =>
    lib.name.toLowerCase().includes(q) ||
    lib.description.toLowerCase().includes(q) ||
    lib.tags.some(tag => tag.toLowerCase().includes(q)) ||
    lib.author.toLowerCase().includes(q)
  )
}

export function getPopularLibraries() {
  return libraries.filter(lib => lib.popularity === 'high')
}
