import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildWhatsAppEnquiryUrl,
  filterProjectsByCategory,
  getProjectBySlug,
  isValidMapsApiKey,
  parseProjectHash,
  validateContactForm,
} from './studioLogic';

const sampleProjects = [
  { slug: 'linen-courtyard-villa', category: 'Residential' as const },
  { slug: 'lumiere-gallery-lounge', category: 'Commercial' as const },
  { slug: 'travertine-penthouse', category: 'Residential' as const },
];

test('filterProjectsByCategory returns all or filters strictly', () => {
  assert.equal(filterProjectsByCategory(sampleProjects, 'All').length, 3);
  const residential = filterProjectsByCategory(sampleProjects, 'Residential');
  assert.equal(residential.length, 2);
  assert.ok(residential.every((p) => p.category === 'Residential'));

  const commercial = filterProjectsByCategory(sampleProjects, 'Commercial');
  assert.equal(commercial.length, 1);
  assert.equal(commercial[0].slug, 'lumiere-gallery-lounge');
});

test('getProjectBySlug and parseProjectHash resolve project routes', () => {
  assert.equal(getProjectBySlug(sampleProjects, 'travertine-penthouse')?.slug, 'travertine-penthouse');
  assert.equal(getProjectBySlug(sampleProjects, 'unknown-slug'), undefined);
  assert.equal(parseProjectHash('#/project/linen-courtyard-villa'), 'linen-courtyard-villa');
  assert.equal(parseProjectHash('#contact'), null);
});

test('validateContactForm catches missing or malformed fields and passes valid payloads', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    phone: '123',
    projectType: 'Residential',
    message: 'Hi',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.phone);
  assert.ok(invalid.message);

  const valid = validateContactForm({
    name: 'Elena Vance',
    email: 'elena@example.com',
    phone: '+1 555 019 2834',
    projectType: 'Residential Interior Design',
    message: 'Looking for full-service architectural interiors for a three-bedroom residence.',
  });
  assert.deepEqual(valid, {});
});

test('isValidMapsApiKey rejects empty and placeholder keys', () => {
  assert.equal(isValidMapsApiKey(undefined), false);
  assert.equal(isValidMapsApiKey(''), false);
  assert.equal(isValidMapsApiKey('YOUR_GOOGLE_MAPS_API_KEY'), false);
  assert.equal(isValidMapsApiKey('AIzaSyFakeExampleKey12345'), true);
});

test('buildGoogleMapsDirectionsUrl and EmbedUrl construct valid URLs', () => {
  const dirUrl = buildGoogleMapsDirectionsUrl({
    addressQuery: 'Design District',
    lat: 40.7128,
    lng: -74.006,
  });
  assert.match(dirUrl, /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=40\.7128%2C-74\.006$/);

  const fallbackEmbed = buildGoogleMapsEmbedUrl({
    query: 'Studio Placeholder',
    lat: 40.7128,
    lng: -74.006,
    zoom: 25,
    mapType: 'roadmap',
  });
  assert.match(fallbackEmbed, /maps\.google\.com\/maps\?/);
  assert.match(fallbackEmbed, /z=20/);
  assert.match(fallbackEmbed, /output=embed/);

  const keyedEmbed = buildGoogleMapsEmbedUrl({
    apiKey: 'AIzaSyRealKeyExample',
    query: 'Studio',
    lat: 40.7128,
    lng: -74.006,
    zoom: 15,
    mapType: 'satellite',
  });
  assert.match(keyedEmbed, /google\.com\/maps\/embed\/v1\/view/);
  assert.match(keyedEmbed, /solution_id=gmp_mcp_codeassist_v1_aistudio/);
});

test('buildWhatsAppEnquiryUrl formats encoded message safely', () => {
  const url = buildWhatsAppEnquiryUrl({
    phoneDigits: '+1 (555) 123-4567',
    studioName: 'Atelier Veyra',
    projectType: 'Modular Kitchen Design',
  });
  assert.ok(url.startsWith('https://wa.me/15551234567?text='));
  assert.ok(decodeURIComponent(url).includes('Modular Kitchen Design'));
});
